
import {test, expect} from '@playwright/test';
interface IFruit {
    name:"Strawberry" | "Banana"|"Pitaya";
    id:number;
}

test.describe('Network Tests',()=>{
    test('mock a fruit and do not call endpoint', async({page})=>{
        //mock the api call befor the navigation
        //no me importa el path nterior, solo cehcaque si el endpoint tiene eso de api v1 fruits, intercepta el endpoint y responde con un json que yo le diga
        await page.route("*/**/api/v1/fruits",async (route)=>{
            //Mocke the response with a json object
            const json: IFruit[] = [{ name: "Strawberry", id: 21 }, { name: "Banana", id: 22 }];
            //fullfill the route with the movked JSON data
            await route.fulfill({ json })
        })
        await page.goto("https://demo.playwright.dev./api-mocking");

        await expect(page.getByRole('heading',{name:"Render a List of fruits"})).toBeVisible();
    })

    //Modifing the mocked response based on the request method
    test.only('gets the json from aapi and adds a new fruit',async({page})=>{
        let resolveIntercept: () => void;
        const interceptDone = new Promise<void>((resolve) => {
            resolveIntercept = resolve;
        });
        await page.route("**/api/v1/fruits", async (route) => {
            // Fetch the original response from the API
            // This will call the actual API endpoint and get the original data
            const response = await route.fetch();

            // Parse the JSON from the response. This is the original data from the API
            const json = await response.json();

            json.push({ name: "Pitaya", id: 100 });

            // Fulfill using the original response, while patching the response body
            // with the given JSON object
            await route.fulfill({ response, json });

            resolveIntercept();
        });

        try {
            await page.goto("https://demo.playwright.dev/api-mocking");

            await interceptDone; // ensure route callback finished

            await expect(page.getByText("Pitaya")).toBeVisible();
        } finally {
            await page.unrouteAll({ behavior: "ignoreErrors" });
        }
    })

})