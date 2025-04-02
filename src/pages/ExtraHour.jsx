import Header from "../components/Header";
import Table from "../components/Table"
import Footer from "../components/Footer"

const ExtraHour = () => {
    return (
        <>
        <div className="min-h-full">
        <Header></Header>
          <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-center text-3xl font-bold tracking-tight text-[#041148]">Gestión de horas extras</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Table></Table>
            </div>
            <div class="fixed bottom-0 w-full">
              <Footer></Footer>
            </div>
          </main>
        </div>
      </>
    )
}
 
export default ExtraHour;