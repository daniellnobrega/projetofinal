var tela = document.querySelector("canvas");
        var pincel = tela.getContext("2d");
        pincel.fillStyle = "lightgray";
        pincel.fillRect(0, 0, 700, 500);
        var raio = 10;

        var xAleatorio;
        var yAleatorio;

        var count = 0;

        var hh = 0;
        var mm = 0;
        var ss = 0;

        var tempo = 1000;
        var cron;

        var dificuldade = 2

        escolher_dificuldade();

        function start() {
            cron = setInterval(() => { timer(); }, tempo);
        }

        function pause() {
            clearInterval(cron);
        }

        function stop() {
            clearInterval(cron);
            var hh = 0;
            var mm = 0;
            var ss = 0;

            document.getElementById("counter").innerHTML = "00:00:00";
        }

        function timer() {
            ss++
            if (ss == 60) {
                ss = 0;
                mm++;

                if (mm == 60) {
                    mm = 0;
                    hh++
                }
            }

            var format = (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss);
            document.getElementById("counter").innerHTML = format;
        }

        function desenhaCirculo(x, y, raio, cor) {

            pincel.fillStyle = cor;
            pincel.beginPath();
            pincel.arc(x, y, raio, 0, 2 * Math.PI);
            pincel.fill();

        }

        function limpaTela() {
            pincel.clearRect(0, 0, 800, 600);
        }

        function desenhaAlvo(x, y) {

            desenhaCirculo(x, y, raio + 20, "red");
            desenhaCirculo(x, y, raio + 10, "white");
            desenhaCirculo(x, y, raio, "red");

        }

        function sorteiaPosicao(maximo) {
            return Math.floor(Math.random() * maximo);
        }

        function atualizaTela() {
            limpaTela();
            xAleatorio = sorteiaPosicao(700);
            yAleatorio = sorteiaPosicao(500);
            desenhaAlvo(xAleatorio, yAleatorio);

        }

        function escolher_dificuldade() {
            switch(dificuldade){
                case 1 :
                    dificuldade = 1000
                break;
                
                case 2 :
                    dificuldade = 800
                break;
                
                case 3 :
                    dificuldade = 600
                break    
            }

        }

        setInterval(atualizaTela, dificuldade);

        function dispara(evento) {

            var x = evento.pageX - tela.offsetLeft;
            var y = evento.pageY - tela.offsetTop;

            if ((x > xAleatorio - raio)
                && (x < xAleatorio + raio)
                && (y > yAleatorio - raio)
                && (y < yAleatorio + raio)) {
                count++;
                alert("acertou " + count);
            }

            if (count == 5) {
                pause();
            }
        }

        tela.onclick = dispara; 

        alert("Bem vindo ao jogo, acerte o alvo 5 vezes no menor tempo possivel")
        start();
     