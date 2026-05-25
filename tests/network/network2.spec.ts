import {test, expect} from '@playwright/test';

test.describe('Mocking http requests and fallbacks',()=>{

    test("handle GET and POST request", async({page})=>{
        await page.route("https://api.example.com/secure-data",async (route)=>{
            if(route.request().method() === "GET"){
                //mock a get request response
                await route.fulfill({
                    status:200,
                    contentType:"application/json",
                    body: JSON.stringify({message:"This is a mocked GET response"})
                })
            } 
            else{
                route.fallback(); // let oyher methids go to next handler
            }
        })

        await page.route('https://api.example.com/secure-data', async (route) => {
            if (route.request().method() === 'POST') {
                // Mock a POST request response
                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify({ message: 'This is a mocked POST response' }),
                });
            } else {
                route.fallback(); // Let other methods go to the next handler
            }
        });

        // fallback of other requests
        await page.route('**/*',async (route)=>{
            route.fallback(); //let all other requests continue normally
        })

        await page.goto("https://example.com");

    });

    

});
