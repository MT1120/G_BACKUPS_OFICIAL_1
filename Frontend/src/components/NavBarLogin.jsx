//import Logo from '../assets/LOGO3.png'
import Dropdown from './Dropdown'

export default function NavBarLogin() {

    const list = [
        {
            "title": "Tipo de cinta",
            "link": `/tapeType`
        },
        {
            "title": "Frecuencia",
            "link": `/frecuency`
        },
        {
            "title": "Información copiada",
            "link": `/infCopied`
        },
        {
            "title": "Servicio soportado",
            "link": `/sspForm`
        },
        {
            "title": "Formulario de Elementos",
            "link": `/element`
        },
        
    ]

    const list_v = [
        {
            "title": "Consultar cintas",
            "link": `/tapeView`
        },
        {
            "title": "Consultar Cloud Storage",
            "link": `/cloudView`
        },
        {
            "title": "Consultar backups",
            "link": `/backupView`
        },
        {
            "title": "Consultar cloud backups",
            "link": `/bkCloudView`
        },
        {
            "title": "Consultar elementos",
            "link": `/elementView`
        },
        {
            "title": "Consultar información Copiada",
            "link": `/infView`
        },
        {
            "title": "Consultar servicios soportados",
            "link": `/sspView`
        },
        {
            "title": "Historial de recuperación",
            "link": `/recoveryView`
        },
        {
            "title": "Historial de envios a custodia",
            "link": `/sendHView`
        },
        {
            "title": "Consultar frecuencias",
            "link": `/frecuencyView`
        },
        {
            "title": "Consultar tipos de cintas",
            "link": `/tapeTypeView`
        },
        
        
        
    ]

    const list_bk = [
        {
            "title": " Formulario de Medios",
            "link": `/FormularioMedios`
        },
        {
            "title": "Formulario de Backups",
            "link": `/backup`
        },
        {
            "title": "Formulario de CloudBackup",
            "link": `/Cloudbackup`
        },
        
        {
            "title": "Recuperación de cintas",
            "link": `/recoverTape`
        },
        {
            "title": "Enviar a custodia",
            "link": `/sendTape`
        },
        
    ]

    // const list_dv = [
    //     {
    //         "title": "Vista detallada de backups",
    //         "link": `/detailedBackup`
    //     },
    //     {
    //         "title": "Vista detallada de Cintas",
    //         "link": `/dTapeView`
    //     },
        
    // ]

    
    return (
        <div className='w-[100wv] h-[80px] bg-white '>
            <div className='flex flex-row  w-full h-full items-center justify-between '>
                <div className='flex w-full lg:justify-around justify-evenly items-center '>
                    
                    <Dropdown list={list} name="CONFIGURACIÓN" />
                    <Dropdown list={list_bk} name="BACKUPS" />
                    <Dropdown list={list_v} name="CONSULTAS " />
                    {/* Y REPORTES */}
                    {/* <Dropdown list={list_dv} name="Vistas detalladas" /> */}
                    {/* <div className='flex flex-row w-[1200px] justify-evenly  mx-5'>
                        
                    </div> */}

                </div>

            </div>

        </div>
    )
}
