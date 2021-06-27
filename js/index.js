const filter = document.querySelector("#filter-jobs");
const button = document.querySelector(".button-container");

let value;

filter.addEventListener('input', (e) => {
    value = e.target.value;
})

button.addEventListener('click', () => {
    console.log(value)
    getJobs().then(jobs=> {
        let filteredJobs = filterJobs(jobs, value);
        showJobs(filteredJobs)
     })
})



function filterJobs(jobs, searchTxt) {
    if(searchTxt) {
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchTxt) | job.type.toLowerCase().includes(searchTxt) | job.company.toLowerCase().includes(searchTxt) | job.requirements.content.toLowerCase().includes(searchTxt)) {
                return true;
            }
            else  {
                return false;
            }
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}



// Fetching data from our API


function getJobs() {
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        return data;
    })
}


function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
        
        jobsHTML += `
        <div class="job-title">
        <div class="top">
                <img src="${job.logo}" alt="">
            <span class="material-icons more_horiz">more_horiz</span>
        </div>
        <div class="rolename"><span>${job.roleName}</span></div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
            <div class="button apply-now">Apply Now</div>
            <div class="button message">Message</div>
        </div>
    </div>

        `;

    }); 

    jobsContainer.innerHTML = jobsHTML;
}

getJobs();


getJobs().then(data => {
    showJobs(data)
}).catch( err => { 
    console.log(err); 
})

