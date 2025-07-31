// ========================================
// main.js - Simple Dark Mode Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function() {
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
body.classList.add('dark-theme');
themeToggle.textContent = ' Light Mode';
}
themeToggle.addEventListener('click', function() {
body.classList.toggle('dark-theme');
const isDark = body.classList.contains('dark-theme');
themeToggle.textContent = isDark ? ' Light Mode' : 'Dark Mode';
localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
});


// functions for daily quotes
// in order to test the daily quote refresh, delete site data and reload
// alternatively, change your local time to be the next day
const quote_url = "https://quoteslate.vercel.app/api/quotes/random";

async function getAndStoreQuote() {
    try {
        const response = await fetch(quote_url);
        
        // verify code errors
        if (response.status === 429) {
            console.error("Rate limit exceeded !");
            document.getElementById("quote-error").textContent = "Rate limit exceeded ! Please try again in one minute...";
            return null;
        }
        if (!response.ok) {
            console.error("Other error: " + response.status);
            document.getElementById("quote-error").textContent = "Something went wrong fetching quotes. Please check console for more data !";
            return null;
        }
        // todays quote is quoteData[0]
        const quoteData =  await response.json();
        
        localStorage.setItem('local_quote_data', JSON.stringify(quoteData));
        console.log("Today's data stored : ", quoteData);
        return quoteData;
    } catch (error) {
        console.error("Uncaught error: " + error);
        document.getElementById("quote-error").textContent = "Something went wrong fetching quotes. Please check console for more data !";
        return null;
    }
}

function getAndStoreDate() {
    const date = new Date();
    let today = date.getDay();
    const storedDate = localStorage.getItem('storedDate');
    
    if (!storedDate) {
        console.log("No date stored in local memory ! Storing current date.");
        console.log(`Today's day is : ${today}`);
    } else if (storedDate != today) {
        console.log(`Stored Date : ${storedDate}`);
        console.log(`Today's Date : ${today}`);
        console.log("Today is a new day, changing quote !")
        const todaysQuote = getAndStoreQuote();
        displayQuote(todaysQuote);
    }
    localStorage.setItem('storedDate', today);
}

function displayQuote(quote) {
    const quoteDisplay = document.getElementById("quote-display");
    const quoteAuthor = document.getElementById("quote-author");
    
    console.log(`Data at this point: ${quote}`);
    if (quote) {
        console.log("Displaying quote...")
        quoteDisplay.textContent = quote.quote;
        quoteAuthor.textContent = `~ ${quote.author}`;
    } else {
        quoteDisplay.textContent = "Failed to display quote";
        quoteAuthor.textContent = "~ Error"
    }
}

function refreshQuote() {
    getAndStoreDate();
    getAndStoreQuote();
    displayQuote();
}

var local_quote_data = localStorage.getItem('local_quote_data');

getAndStoreDate();

async function initialise() {
    if (!local_quote_data) {
        console.log("No local quote data found ! Fetching from API.");
        const todaysQuote = await getAndStoreQuote();
        if (todaysQuote) {
            console.log("Local data generated : " + todaysQuote);
            displayQuote(todaysQuote);
        } else {
            document.getElementById("quote-error").textContent = "Failed to load any quote..."
        }
    } else {
        const todaysQuote = JSON.parse(local_quote_data);
        console.log("Local data found : " + todaysQuote);
        displayQuote(todaysQuote);
    }
}

initialise();

// every hour check if it is a new day
setInterval(async () => {
    getAndStoreDate();
}, 60 * 60 * 1000);

// Image Slideshow
const property = "url('/Sorcielle-Webdemo/images/moi";
const extension = ".jpg')";
const total = 4;
let index = 2;
setInterval(async () => {
    console.log(`Changing image to: ${property + index + extension}`);
    document.getElementById("moi-img").style.content = property + index + extension;
    index++;
    if (index == total + 1) {
        index = 1;
    }
}, 3000);