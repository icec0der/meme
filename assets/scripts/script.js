window.addEventListener('load', function (e) {
	const bars = document.querySelector('header nav .bars')
	const navbarMobile = document.querySelector('.nav-mobile')
	const navbarMobileLinks = document.querySelectorAll('.nav-mobile ul li')
	const navbarMobileBtn = document.querySelector('.nav-mobile .bars')

	bars.addEventListener('click', () => {
		navbarMobile.style.display = 'flex'
	})
	navbarMobileBtn.addEventListener('click', () => {
		navbarMobile.style.display = 'none'
	})
	navbarMobileLinks.forEach(item => {
		item.addEventListener('click', () => {
			navbarMobile.style.display = 'none'
		})
	})
})

document.getElementById('copyButton').addEventListener('click', function () {
	const textToCopy = 'FwKD9VVSjAMxSyLaTK2H92g9vzYVdHrBAi4ZtkgBxNtc'
	const copyButton = document.getElementById('copyButton')

	const tempTextarea = document.createElement('textarea')
	tempTextarea.value = textToCopy
	document.body.appendChild(tempTextarea)

	tempTextarea.select()
	tempTextarea.setSelectionRange(0, 99999)

	document.execCommand('copy')

	document.body.removeChild(tempTextarea)

	copyButton.textContent = 'Copied ✅'

	setTimeout(() => {
		copyButton.textContent = 'Copy'
	}, 2000)
})
const totalSol = 7777;
const solInput = document.getElementById('solInput');
const percentValue = document.getElementById('percentValue');
const percentDiv = document.querySelector('.percent_div');
const maxWidth = document.querySelector('.percent_big_div').offsetWidth;
const padding = 10 * 2;

const originalWidth = solInput.offsetWidth; // Store the original width

function updateValues() {
	let inputValue = parseFloat(solInput.value);

	// Default to 0 if input is empty or invalid
	if (isNaN(inputValue)) {
		inputValue = 0;
		// solInput.value = 0;
	} else if (inputValue > totalSol) {
		inputValue = totalSol;
		solInput.value = totalSol; // Optional: Update the input field value to totalSol
	}

	const percentage = (inputValue / totalSol) * 100;

	percentValue.textContent = percentage.toFixed(2) + '%';

	// Calculate the new width, considering padding
	const newWidth = (maxWidth - padding) * (inputValue / totalSol);
	percentDiv.style.width = newWidth + 'px';
}

// Update values on input change
solInput.addEventListener('input', updateValues);

// Set to 0 if empty when losing focus
solInput.addEventListener('blur', function () {
	if (solInput.value === '') {
		solInput.value = 0;
		updateValues();
	}
	solInput.style.width = originalWidth + 'px';
});

// Set the width to 50px on focus
solInput.addEventListener('focus', function () {
	solInput.style.width = '50px';
});




async function getBalance() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/balance');
        const data = await response.json();
        return data.balance;
    } catch (error) {
        console.error('Ошибка :', error);
        return null;
    }
}

const MAX_SOL = 7777;

function calculatePercentage(sol) {
    const solValue = parseFloat(sol);
    if (isNaN(solValue) || solValue < 0) {
        return '0.00';
    }
    let percentage = (solValue / MAX_SOL) * 100;
    percentage = Math.min(percentage, 100);
    return percentage.toFixed(2);
}

function updatePercentage(newPercentage) {
    const percentValueElement = document.getElementById('percentValue');
    const currentBonusElement = document.getElementById('currentBonus');
    const currentBonus2Element = document.getElementById('currentBonus2');

    if (percentValueElement) percentValueElement.textContent = `${newPercentage}%`;
    if (currentBonusElement) currentBonusElement.textContent = `${newPercentage}%`;
    if (currentBonus2Element) currentBonus2Element.textContent = `${newPercentage}%`;
    if (percentDiv) percentDiv.style.width = `${newPercentage}%`;
}

async function updateBalanceAndPercentage() {
    const balance = await getBalance();
    if (balance !== null) {
        const percentage = calculatePercentage(balance);
        updatePercentage(percentage);
    }
}

updateBalanceAndPercentage();
setInterval(updateBalanceAndPercentage, 2 * 60 * 1000);
