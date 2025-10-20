import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, ExternalLink } from "lucide-react"

interface PDFViewerProps {
  pdfUrl: string
  title: string
}

export const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-medium">Visualizador de PDF</span>
        </div>
        <div className="flex gap-2">
          <a href={pdfUrl} download={`${title}.pdf`}>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
          </a>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir
            </Button>
          </a>
        </div>
      </div>

      <div className="relative w-full" style={{ height: "600px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Carregando PDF...</p>
            </div>
          </div>
        )}
        <iframe 
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`} 
          title={`PDF - ${title}`} 
          className="w-full h-full border-0" 
          onLoad={handleLoad}
          allow="fullscreen"
        />
      </div>
    </Card>
  )
}
