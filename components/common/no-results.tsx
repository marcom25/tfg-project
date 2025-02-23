import { SearchX } from "lucide-react"

export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
      <p className="text-muted-foreground">
        No hay proveedores que coincidan con tu búsqueda. Intenta con otros términos.
      </p>
    </div>
  )
}