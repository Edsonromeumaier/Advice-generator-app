const url = 'https://api.adviceslip.com/advice';

async function fetchAdvice() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error to get advice", error);
        return { error: "wait a few moments before request again." };
    }
}

async function displayAdvice() {
    const adviceContainer = document.querySelector(".advice");
    try {
        const adviceData = await fetchAdvice();
        if (adviceData.error) {
            adviceContainer.innerHTML = `<p>${adviceData.error}</p>`;
        } else {
            const conselho = adviceData.slip.advice;
            adviceContainer.innerHTML = `<p>"${conselho}"</p>`;
            
            // Exibir o ID do conselho
            const adviceIdElement = document.getElementById("advice-id");
            adviceIdElement.innerHTML = 'advice #' + adviceData.slip.id;
        }
    } catch (error) {
        adviceContainer.innerHTML = "<p>Ocorreu um erro ao carregar o conselho.</p>";
    }
}

displayAdvice();

const generateButton = document.getElementById("generate"); 

generateButton.addEventListener('click', function(){
    displayAdvice();
});

