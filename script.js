

async function registerUser()
{
    const name =
        document.getElementById("name").value;

    const voterId =
        document.getElementById("voterId").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch(
            "https://online-voting-system-36fi.onrender.com/register",
            {
                method: "POST",

                headers:
                {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    name,
                    voterId,
                    password
                })
            }
        );

    const result =
        await response.text();

    alert(result);

    if(result === "Registration Successful")
    {
        window.location.href =
            "login.html";
    }
}

async function loginUser()
{
    const voterId =
        document.getElementById("voterId").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch(
            "https://online-voting-system-36fi.onrender.com/login",
            {
                method: "POST",

                headers:
                {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    voterId,
                    password
                })
            }
        );

    const result =
        await response.text();

    alert(result);

    if(result === "Login Successful")
    {
        localStorage.setItem(
            "currentVoter",
            voterId
        );

        window.location.href =
            "vote.html";
    }
}


// VOTE FUNCTION

async function vote(candidate)
{
    let voterId =
        localStorage.getItem("currentVoter");

    const response = await fetch(
        "https://online-voting-system-36fi.onrender.com/vote",
        {
            method: "POST",

            headers:
            {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                voterId: voterId,
                candidate: candidate
            })
        }
    );

    const data = await response.text();

    alert(data);

    updateVotePage();
}

async function updateVotePage()
{
    const response =
        await fetch("https://online-voting-system-36fi.onrender.com/results");

    const data =
        await response.json();

    if(document.getElementById("modiVotes"))
        document.getElementById("modiVotes").innerText =
            "Votes: " + data.modi;

    if(document.getElementById("murmuVotes"))
        document.getElementById("murmuVotes").innerText =
            "Votes: " + data.murmu;

    if(document.getElementById("pawankalyanVotes"))
        document.getElementById("pawankalyanVotes").innerText =
            "Votes: " + data.pawankalyan;
}

// LOAD RESULTS

async function loadResults()
{
    const response =
        await fetch("https://online-voting-system-36fi.onrender.com/results");

    const data =
        await response.json();

    document.getElementById("m").innerText =
        data.modi;

    document.getElementById("mu").innerText =
        data.murmu;

    document.getElementById("p").innerText =
        data.pawankalyan;
}


// SHOW WINNER

async function loadWinner()
{
    const response =
        await fetch("https://online-voting-system-36fi.onrender.com/winner");

    const data =
        await response.json();

    document.getElementById("winner").innerHTML =
        "Winner is " + data.winner;
}


// LOAD CHART

async function loadChart()
{
    const response =
        await fetch("https://online-voting-system-36fi.onrender.com/results");

    const data =
        await response.json();

    new Chart(
        document.getElementById("voteChart"),
        {
            type: "pie",

            data:
            {
                labels:
                [
                    "Modi",
                    "Murmu",
                    "Pawan Kalyan"
                ],

                datasets:
                [{
                    data:
                    [
                        data.modi,
                        data.murmu,
                        data.pawankalyan
                    ],

                    backgroundColor:
                    [
                        "red",
                        "blue",
                        "green"
                    ]
                }]
            }
        }
    );
}


if(document.getElementById("m"))
{
    loadResults();
}

if(document.getElementById("winner"))
{
    loadWinner();
}

if(document.getElementById("voteChart"))
{
    loadChart();
}

if(document.getElementById("modiVotes"))
{
    updateVotePage();
}