function first() {
    console.log(1);
}

function second(callback) {
   setTimeout(function() {
       console.log(2);
       callback();
   }, 0);
}

function third() {
    console.log(3);
}

first();
second(third);

// function fn() {
//     console.log('Just a function');
// }

// function highOrderFunction(callback) {
//     callback();
// }

// highOrderFunction(fn)

function pyramidOfDoom(){
    setTimeout(function(){
        console.log('1');
        setTimeout(function(){
            console.log('2');
            setTimeout(function(){
                console.log('3');
            }, 500);
        },2000);

    },1000);
}

pyramidOfDoom();

function asynchronousRequest(args, callback) {
    if(!args) {
        return callback(new Error('No args'));
    } else {
        return setTimeout(() => callback(null, {body: `${args} ${Math.floor(Math.random() * 10)}`}), 500);
    }
}

function callbackHell() {
    asynchronousRequest('First', function first(error, response) {
        if(error){
            console.log(error);
            return;
        }
        console.log(response.body);
        asynchronousRequest('Second', function second(error, response) {
            if(error){
                console.log(error);
                return;
            }
            console.log(response.body);
            asynchronousRequest(null, function third(error, response) {
                if(error){
                    console.log(error);
                    return;
                }
                console.log(response.body);
            });
        });
    })
}

callbackHell();

// initialize a promise
// Pending - Initial state before beign resolved or rejected
// Fullfilled - When the promise is resolved
// Rejected - When the promise is rejected
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Resolving an asyncronous request!'), 2000)
;});

promise
    .then((firstResponse) => {
        return `${firstResponse} And chaining!`
    })
    .then((secondResponse) => {
        console.log(secondResponse);
    })

function getUsers(onSuccess) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(onSuccess) {
                resolve([{
                    name: 'John',
                    age: 30
                }
                , {
                    name: 'Jane',
                    age: 25
                },
                {
                    name: 'Jack',
                    age: 20
                }]);
            } else {
                reject('Failed to fetch data!');
            }
        }, 2000)
    });
}

getUsers(true)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });


// Fetch a user from the GitHub API
fetch('https://api.github.com/users/sotopro')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    })