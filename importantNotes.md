# Notes
1. After a customer orders from one menu, he/she will not be able to order from another menu. The customer will have to start a new order to order from another menu.



# BurnDown Chart ratings

1. Sign up - 2
2. Sign in - 2


Paul - Redo database schema chart
Suraj - Burndown chart
Alex - My restaurants Tab




# New List

- [x] Get user profile information
- [x] Update user profile information
- [x] Updated create owner route and added if statements
- [x] Become Driver from User view
- [x] Become owner from user view
- [x] Update basic restaurant info
6. Accept order route for restaurant view
7. Driver accept order route from driver view
8. Update ready to be picked up time from restaurant view
9. Update picked up time from driver view
10. Update actual delivery time from driver


- [x] Create category menu category and push to specific menu

- [x] create menu-item and push to specific category
- [x] get restaurant info
- [x] create empty cart route
- [x] create address route
- [] create update ready route
- [] create update en route by driver
- [] create update delivery time by driver
- [] create add tips by user

# Cart - order system
1. [x] when you create a new user create a cart assigned to that user
2. **NEED HELP**add items to that cart when shopping
3. [NT] After user clicks "Place Order", do the following:
    - Create the order
    - Create the transaction
    - Push order to current order list of **User** and **Restaurant**
    - Create another empty cart and assign it to user 
4. [NT] create 2 seperate routes, accept and reject routes by restaurant
    - implement moment for accept and reject time
5. Create route for driver to accept order


# Other Important routes
- [x] a route that finds all menu items on menu
- create route that finds all available orders upon componentDidMount      on driver home where:
    isAccepted = true
    driver = null
- create route that finds all open restaurants 
- create a route for a search algorithm
- route that pull all menu items on a menu
