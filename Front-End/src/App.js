import React from 'react';
import './global.css'
import './App.css';
import Routes from './routes'

/* 
  Função que representa a página,
  Aqui o ReactJs chamará todos os componentes para renderiza-los na tela.

  Cada página é um arquivo JS externo que é chamado pela tag Routes
*/
function App() {

  React.useEffect(() => {
    setTimeout(() => {
      const bgLoader = document.getElementById('bg-loader');
      bgLoader.classList.add('close');
      }, 8000);
    setTimeout(() => {
      const lina = document.getElementById('logo-lina');
      lina.classList.add('close');
      }, 3500);
    return () => clearTimeout();
  });
    
  return (
    <div className="App">

      <section id='bg-loader'  className='bg-loader'>
        <div id='logo-lina' className="logo-lina">
          <svg width="588" height="246" viewBox="0 0 588 246" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='lina' d="M1 241V1H26.5V218H124V241H1Z" fill="#000080"/>
            <path className='lina' d="M170.5 61H146L145.5 239.5H170.5V61Z" fill="#000080"/>
            <path className='lina' d="M211 239.5V61H234.5V80.5C250.905 61.6678 263.463 57.25 289.5 56C343.592 53.6088 368 104 368 130.5V239.5H341.5V130.5C341.5 110.5 324 78.5 289.5 78.5C255 78.5 234.5 107.5 234.5 128.5V239.5H211Z" fill="#000080"/>
            <path className='lina' fill-rule="evenodd" clip-rule="evenodd" d="M561.5 60.5H587V239.5H561.5V214.5C545.32 231.941 533.268 238.452 507 244.5H484.5C458.179 239.015 445.422 233.424 427 218C411.937 200.342 405.792 189.292 400 167V132.5C407.197 109.472 411.705 99.0487 425.5 84C442.643 66.2562 456.566 59.8039 484.5 55.5H507C533.029 61.2386 545.066 68.307 561.5 88.5V60.5ZM507 79.5H484.5C465.125 84.019 454.82 88.2403 439.5 105C429.675 117.624 426.457 126.6 423 144.5C423.002 165.596 426.721 176.623 439.5 195C452.839 209.973 462.55 215.855 484.5 221H507C529.476 215.86 537.732 209.473 550.5 195C561.931 178.779 566.741 168.605 566.5 144.5C563.44 128.057 560.762 119.143 550.5 105C536.377 90.0307 526.837 84.4745 507 79.5Z" fill="#000080"/>
            <path className='lina-without-fill' d="M234.5 239.5H211V61H234.5V80.5C250.905 61.6678 263.463 57.25 289.5 56C343.592 53.6088 368 104 368 130.5M234.5 239.5C234.5 239.5 234.5 149.5 234.5 128.5M234.5 239.5V128.5M234.5 128.5C234.5 107.5 255 78.5 289.5 78.5C324 78.5 341.5 110.5 341.5 130.5M341.5 130.5C341.5 150.5 341.5 239.5 341.5 239.5M341.5 130.5V239.5M341.5 239.5H368M368 239.5C368 239.5 368 157 368 130.5M368 239.5V130.5M1 1V241H124V218H26.5V1H1ZM146 61H170.5V239.5H145.5L146 61ZM561.5 60.5H587V239.5H561.5V214.5C545.32 231.941 533.268 238.452 507 244.5H484.5C458.179 239.015 445.422 233.424 427 218C411.937 200.342 405.792 189.292 400 167V132.5C407.197 109.472 411.705 99.0487 425.5 84C442.643 66.2562 456.566 59.8039 484.5 55.5H507C533.029 61.2386 545.066 68.307 561.5 88.5V60.5ZM484.5 79.5H507C526.837 84.4745 536.377 90.0307 550.5 105C560.762 119.143 563.44 128.057 566.5 144.5C566.741 168.605 561.931 178.779 550.5 195C537.732 209.473 529.476 215.86 507 221H484.5C462.55 215.855 452.839 209.973 439.5 195C426.721 176.623 423.002 165.596 423 144.5C426.457 126.6 429.675 117.624 439.5 105C454.82 88.2403 465.125 84.019 484.5 79.5Z" stroke="#000080" stroke-width="2"/>
          </svg>
          <div className="dot">
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className='lina-dot' d="M35.5 8.5C31.1319 4.12243 27.9203 2.59496 20.5 2C14.0311 2.83222 10.706 3.93723 6 8.5C2.43338 12.8906 1.94533 15.6673 1.5 21C2.27511 26.2792 3.05604 28.8119 6 33C10.4311 37.5013 13.7405 38.3404 20.5 39.5C27.8199 38.1576 31.1859 37.2071 35.5 33C38.0431 28.6405 38.8022 25.9745 39.5 21C39.0266 16.1634 38.2798 13.4339 35.5 8.5Z" fill="#FB1186" stroke="#FB1186" stroke-width="2"/>
            </svg>
          </div>
        </div>

      </section>
      <Routes />
    </div>

  );
}

export default App;

// TODO: Estudar isso
// Pedir ajuda para ajustar os panes quando eles ultrapassarem a div
// Verificar a necessidade do adicionar mais arquivos no dividir
// Ver qual versão do dividir eles preferem
// deixar as páginas responsívas para celular
// continuar a repadronização dos das páginas
// Ajustar os paineis para mobile