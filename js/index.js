$(() => {

    const items = [];

    for(let x = 0; x < 100; x++) {
        items.push(x);
    }

    let rolling = false;

    function roll(winner) {

        if(rolling == true) return false;

        rolling = true;

        const rouletteSize = 550;
        const blockSize = 100;
        const minDuration = 6000;
        const maxDuration = 15000;
        
        const minSlideDelay = 100;
        const maxSlideDelay = 300;
        const slideDelay = Math.floor(Math.random() * (maxSlideDelay - minSlideDelay + 1)) + minSlideDelay;

        const rollDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
        const rollFrames = parseInt(rollDuration/slideDelay);

        const rollResult = winner !== undefined ? winner.toString() : items[Math.floor(Math.random() * items.length)];

        console.log("Winner:", rollResult);

        // bloqueia o botão

        $("#spin").addClass("disabled");
        $("#spin").text("...");

        // reseta a roleta

        $("#roulette__items").html("");
        $("#roulette__items").stop(true).css({"right": "0"});

        // preenche a roleta

        $("#roulette__items").css({"width": `${(rollFrames * blockSize)}px`})
        for(let i = 0; i < rollFrames + 10; i++) {

            if(i === (rollFrames + (parseInt((rouletteSize/blockSize)/2)))) {

                const element = `<div class="item">${rollResult}</div>`
    
                $(element).appendTo("#roulette__items");

            } else {

                const randomItem = items[Math.floor(Math.random() * items.length)];

                const element = `<div class="item">${randomItem}</div>`
    
                $(element).appendTo("#roulette__items");

            }

        }

        // anima a roleta

        $("#roulette__items").animate({
            right: `${(blockSize * rollFrames) - Math.floor(Math.random() * (blockSize/2))}px`
        }, rollFrames * slideDelay, "easeOutQuad");

        setTimeout(() => {
            $("#spin").removeClass("disabled");
            $("#spin").text("GIRAR");
            rolling = false;
        }, rollFrames * slideDelay);

    }

    $("#spin").on("click", function() {
        roll();
    })

});