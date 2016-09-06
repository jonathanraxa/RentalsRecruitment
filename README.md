# RentalsRecruitment
"Calculate Your Rent."

------------------------------------------------------------------------------------
INSTRUCTIONS ON RUNNING APPLICATION
------------------------------------------------------------------------------------

1) Get folder by downloading source code or cloning

2) In terminal/command line enter and run "npm install"

3) Once installations are complete, enter in "node start" and select "enter"

4) Open a Chrome or Firefox browswer

5) Navigate to "localhost:3000"

6) Select "Alorithm Explanation" to see results of 4 of the pre-selected properties' prices

7) You shall also input your own in the forms provided on the homepage of the application


------------------------------------------------------------------------------------
MAIN ALGORITHM EXPLANATION
------------------------------------------------------------------------------------

1) Parse CSV data and convert into JSON data structure for easier reading. 

2) Sort the Bathrooms, Bedrooms, Square Feet, and Prices.

3) Retrieve the median for each category.

4) Divide the price by the median sq-ft result which determines a base price per square foot.

5) Determine the ratio for bathroom to square feet and bedroom to square feet.

6) Calculate the pricing for 2 bedrooms, 1 bathroom for 1000 sq-ft under $1892 (these are the set
standards given to us by the median). When adding the total price together, it should come to about $1892.

7) Use the determined prices from step 6 to calculate the rest of the properties. 


------------------------------------------------------------------------------------
FEATURES
------------------------------------------------------------------------------------

- User form input to determine price of property given number of bedrooms, bathrooms, and set square footage.

------------------------------------------------------------------------------------
Files/Folders
------------------------------------------------------------------------------------

- "css" --> custom.css front-end view
- "js" --> all logic and event handlers
- "data" --> data used to calculate algorithm

