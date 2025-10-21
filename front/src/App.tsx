import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BooksProvider } from "@/contexts/BooksContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Home } from "@/pages/Home"
import { BookDetails } from "@/pages/BookDetails"

function App() {
  return (
    <Router>
      <BooksProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/livro/:id" element={<BookDetails />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BooksProvider>
    </Router>
  )
}

export default App
