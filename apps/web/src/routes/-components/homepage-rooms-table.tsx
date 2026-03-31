import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Link } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { roomsCollection } from "@/data/rooms/collections";

/** Mirrors `room` rows from D1 / listAllRooms (avoid importing @n0k/db in client UI). */
type Room = {
	id: string;
	name: string;
	description: string | null;
};

const columnHelper = createColumnHelper<Room>();

function truncate(s: string | null, max: number) {
	if (s == null || s === "") return "none";
	if (s.length <= max) return s;
	return `${s.slice(0, max - 1)}…`;
}

/** Placeholder until dead rooms are loaded from the backend; stable for SSR/client. */
function placeholderDeadCount(rooms: { id: string }[]) {
	const seed = `${rooms.length}:${rooms.map((r) => r.id).sort().join(",")}`;
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (Math.abs(h) % 47) + 3;
}

export function HomepageRoomsTable() {
	const { data: rooms } = useLiveSuspenseQuery(
		(q) =>
			q.from({ room: roomsCollection }).orderBy(({ room }) => room.name, "asc"),
		[],
	);

	const deadRoomsPlaceholder = useMemo(
		() => placeholderDeadCount(rooms),
		[rooms],
	);

	const [sorting, setSorting] = useState<SortingState>([
		{ id: "name", desc: false },
	]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("name", {
				header: "room",
				cell: (ctx) => {
					const row = ctx.row.original;
					return (
						<Link
							to="/app/rm/$roomId"
							params={{ roomId: row.id }}
							className="homepage-table__room-link"
						>
							<code className="homepage-table__mono">{ctx.getValue()}</code>
						</Link>
					);
				},
			}),
			columnHelper.accessor("description", {
				header: "description",
				enableSorting: true,
				sortingFn: (rowA, rowB, columnId) => {
					const a = rowA.getValue<string | null>(columnId) ?? "";
					const b = rowB.getValue<string | null>(columnId) ?? "";
					return a.localeCompare(b);
				},
				cell: (ctx) => (
					<span className="homepage-table__muted">
						{truncate(ctx.getValue(), 48)}
					</span>
				),
			}),
			columnHelper.display({
				id: "status",
				header: "status",
				cell: () => (
					<span className="homepage-table__placeholder">…</span>
				),
			}),
			columnHelper.display({
				id: "temp",
				header: "T (K)",
				cell: () => (
					<span className="homepage-table__placeholder">…</span>
				),
			}),
			columnHelper.display({
				id: "fuel",
				header: "fuel",
				cell: () => (
					<span className="homepage-table__placeholder">…</span>
				),
			}),
		],
		[],
	);

	const table = useReactTable({
		data: rooms,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<>
			<div className="homepage__panel-head">
				<h2 className="homepage__panel-title">rooms directory</h2>
				<p className="homepage__panel-meta">
					{rooms.length} alive · {deadRoomsPlaceholder} dead
				</p>
			</div>
			{rooms.length === 0 ? (
				<div className="homepage-table__empty" role="status">
					<p className="homepage-table__empty-title">no rooms yet</p>
					<p className="homepage-table__empty-hint">
						create one with the button above. heat, fuel, and decay attach once
						thermodynamics land.
					</p>
				</div>
			) : (
				<div className="homepage-table__scroll">
					<table className="homepage-table">
						<thead>
							{table.getHeaderGroups().map((hg) => (
								<tr key={hg.id}>
									{hg.headers.map((header) => (
										<th key={header.id} scope="col">
											{header.isPlaceholder ? null : header.column.getCanSort() ? (
												<button
													type="button"
													className="homepage-table__sort"
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													<span
														className="homepage-table__sort-indicator"
														aria-hidden
													>
														{header.column.getIsSorted() === "asc"
															? " ↑"
															: header.column.getIsSorted() === "desc"
																? " ↓"
																: ""}
													</span>
												</button>
											) : (
												flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
