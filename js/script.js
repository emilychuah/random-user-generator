const randomFolks = document.querySelector(".random-peeps");
const selectUserNumber = document.querySelector("#users");

const getData = async function (numUsers) {
    const usersRequest = await fetch(`https://randomuser.me/api?results=${numUsers}`); // This fetches data from the API with a parameter to access 5 results at a time.
    const data = await usersRequest.json();
    //console.log(data);
    
    const userResults = data.results; // 'results' is the property name for the array of objects. Use dot (.) notation to access object values.
    //console.log(userResults);

    displayUsers(userResults);
};

getData(1); // This fixes the number of users displayed to 1 every time the page is initially loaded or refreshed.

const displayUsers = function (userResults) {
    randomFolks.innerHTML = ""; // This is to empty the randomFolks element’s contents to make sure you don’t duplicate any DOM elements. This ensures that the amount of users displayed on the page won't accumulate every time the user changes the drop-down list without refreshing the page.

    for (const user of userResults) {
        const country = user.location.country; // Use const here since country is not defined outside of for...of loop. Also, this loop creates a new constant variable every time so there's no need to use let.
        const name = user.name.first;
        const imageUrl = user.picture.medium;

        const userDiv = document.createElement("div"); // This creates a new div for every user, to be nested under the <div class="random-peeps"></div>.
        userDiv.innerHTML = `
                <h3>${name}</h3>
                <p>${country}</p>
                <img src=${imageUrl} alt="User avatar" />
            `;
        randomFolks.append(userDiv); // This nests userDiv under randomFolks. 
    }
};

selectUserNumber.addEventListener("change", function (e) {
    const numUsers = e.target.value;
    getData(numUsers);
});