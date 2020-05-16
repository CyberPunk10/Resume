// import hello from './hello';

// hello('Konstantin');


// _progress.scss
// 
// function random(min, max) {
//   var rand = min + Math.random() * (max + 1 - min);
//   rand = Math.floor(rand);
//   return rand;
// }
// 
// setTimeout(function () {
//   document.querySelector('progress').value = random(10, 100);
// }, 0);
window.onload = function () {        // Страница загружена

  let userAgent = navigator.userAgent.toLowerCase();

  let Mozila = /firefox/.test(userAgent);
  let Chrome = /chrome/.test(userAgent);
  let Safari = /safari/.test(userAgent);
  let Opera = /opera/.test(userAgent);

  let InternetExplorer = false;
  if ((/mozilla/.test(userAgent) && !/firefox/.test(userAgent) && !/chrome/.test(userAgent) && !/safari/.test(userAgent) && !/opera/.test(userAgent)) || /msie/.test(userAgent))
    InternetExplorer = true;

  //console.log(Mozila, Chrome, Safari, Opera, InternetExplorer)

  // ava-photo-svg
  (function () {
    const avatar = document.querySelector('#avatar'),
      photoSvg_path = avatar.querySelector('#photoSvg_path')

    const line = document.querySelector('.line')

    if (Mozila) {                                                       // анимация будет постоянна и не интерактивна для Mozila
      photoSvg_path.innerHTML = `
      <animate attributeName="d" dur="100000ms" repeatCount="indefinite" fill="freeze" calcMode="linear"
        restart="whenNotActive" keyTimes="0; 0.3; 0.5; 0.55; 0.7; 1"
        values="M0.499981 343L0.499969 417.999H857L567 0.000610352L544 0.000778198C300 0.000686646 403 175 279 295C155 415 28 351.607 0.499981 343Z;
        M0.499981 343L0.499969 417.999H857L567 0.000610352L544 0.000778198C685 528 450 285 304 343C158 401 203 256 0.499981 343Z;
        M0.500031 399.499L0.500042 418.001H545.499L567 0L857 369.499C433.5 436 352.5 372.001 275.5 372.001C198.5 372.001 199.5 399.499 0.500031 399.499Z;
        M0.500031 399.499L0.500042 418.001H545.499L567 0L857 369.499C433.5 436 352.5 372.001 275.5 372.001C198.5 372.001 199.5 399.499 0.500031 399.499Z;
        M0.499981 343L0.499969 417.999H857L567 0.000610352L544 0.000778198C685 528 450 285 304 343C158 401 203 256 0.499981 343Z;
        M0.499981 343L0.499969 417.999H857L567 0.000610352L544 0.000778198C300 0.000686646 403 175 279 295C155 415 28 351.607 0.499981 343Z">
      </animate>`;
    } else {                                                            // для Chrome (и других, кто может) анимация будет при наведении и уходе (эмуляция hover)
      // блок #avatar под курсором в данный момент (если есть)
      let currentElem = null

      avatar.onmouseover = function (event) {
        // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
        // если currentElem есть, то мы ещё не ушли с предыдущего (#avatar),
        // это переход внутри - игнорируем такое событие
        if (currentElem) return;

        let target = event.target.closest('#avatar');

        // переход не на <#avatar> - игнорировать
        if (!target) return;

        // переход на #avatar

        // ура, мы зашли на новый <td>
        currentElem = target;

        transformAnimateOver()

      };

      function transformAnimateOver() {

        let d = photoSvg_path.getAttribute('d')                         // обновляем путь, чтобы анимация не скакала
        photoSvg_path.setAttribute('d', d)

        photoSvg_path.innerHTML = `
        <animate attributeName="d" dur="1000ms" repeatCount="1" fill="freeze" calcMode="linear"
          restart="whenNotActive" begin="indefinite"
          values="${d};
          M0.500031 399.499L0.500042 418.001H545.499L567 0L857 369.499C433.5 436 352.5 372.001 275.5 372.001C198.5 372.001 199.5 399.499 0.500031 399.499Z;">
        </animate>`;
        document.querySelector('#photoSvg_path > animate').beginElement()  /* метод запускает анимацию */
        line.style.opacity = '0'

      }

      avatar.onmouseout = function (event) {
        // если мы вне (#avatar), то игнорируем уход мыши
        // это какой-то переход внутри таблицы, но вне <td>,
        // например с <tr> на другой <tr>
        if (!currentElem) return;

        // мы покидаем элемент – но куда? Возможно, на потомка?
        let relatedTarget = event.relatedTarget;

        while (relatedTarget) {
          // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
          // если да, то это переход внутри элемента – игнорируем
          if (relatedTarget == currentElem) return;

          relatedTarget = relatedTarget.parentNode;
        }

        // мы действительно покинули элемент
        currentElem = null;

        transformAnimateOut()
      };

      function transformAnimateOut() {

        let d = photoSvg_path.getAttribute('d')                         // обновляем путь, чтобы анимация не скакала
        photoSvg_path.setAttribute('d', d)

        photoSvg_path.innerHTML = `
        <animate attributeName="d" dur="1000ms" repeatCount="1" fill="freeze" calcMode="linear"
          restart="whenNotActive" begin="indefinite"
          values="${d};
          M0.49995 343L0.499939 417.999H857L567 0.000488281L544 0.000656128C300 0.000564575 403 175 279 295C155 415 28 351.607 0.49995 343Z;">
        </animate>`;
        document.querySelector('#photoSvg_path > animate').beginElement()  /* метод запускает анимацию */
        line.style.opacity = ''

      }
    }

  }(

  ));

  let nowDate = new Date()
  let date1990 = new Date(1990, 10, 08)
  let diff = nowDate - date1990
  let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 361))
  const yearsMe = document.getElementById('years-me')
  yearsMe.innerText = years


}
