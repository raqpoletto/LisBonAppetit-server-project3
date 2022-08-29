# Project Name

<br>

# Quick Compo

<br>

## Description

This is a platform for those who want to eat very well without spending a lot in the city of Lisbon.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start searching for good and cheap restaurants.
- **Login:** As a user I can login to the platform so that I can access my profile and search restaurant based on my location and preferences.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in visitor I can visit my profile page so that I can see and manage all my favourite restaurants.
- **View Restaurants List:** As a user I want to see all the restaurants available and also search the ones that meet my criteria by name, by type or by location.
- **View Restaurant Details:** As a user I would like to see the restaurants details, give reviews and add to favourite list. Also, I would like to delete my own reviews.
- **User Profile Page Admin:** As a logged in admin I can visit my profile page so that I can see and manage all the restaurants in the database.
- **Create Restaurants:** As a logged in admin I can access the add restaurants page so that I can add a new restaurant.
- **Edit Restaurants:** As a logged in admin I can access the edit restaurant page so that I can update it.
- **Delete Restaurants:** As a logged in admin I can delete a restaurant from the database.

## Backlog

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                              | Component             | Permissions                 | Behavior                                                                                     |
| --------------------------------- | --------------------- | --------------------------- | -------------------------------------------------------------------------------------------- | --- |
| `/`                               | HomePage              | public `<Route>`            | Home page.                                                                                   |
| `/login`                          | LoginPage             | anon only `<AnonRoute>`     | Login form, navigates to profile page after login.                                           |
| `/signup`                         | SignupPage            | anon only `<AnonRoute>`     | Signup form, navigates to login page after signup.                                           |
| `/profile`                        | ProfilePage           | user only `<PrivateRoute>`  | User profile for the current user.                                                           |
| `/restaurants`                    | RestaurantListPage    | user only `<PrivateRoute>`  | See the all the restaurants in the database. Also can search restaurants by name or location |
| `/restaurants/add`                | CreateRestaurantPage  | admin only `<PrivateRoute>` | Create a new restaurant.                                                                     |
| `/restaurants/edit/:restaurantId` | EditRestaurantPage    | admin only `<PrivateRoute>` | Edit a restaurant.                                                                           |
| `/restaurants/:restaurantId`      | RestaurantDetailsPage | user only `<PrivateRoute>`  | Shows all infos about the selected restaurant.                                               |     |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- RestaurantListPage

- CreateRestaurantPage

- EditRestaurantPage

- RestaurantDetailsPage

Components:

- Navbar
- SearchBar
- Comment
- FavouriteRestaurant

## Services

- **Auth Service**

  `.login(user)`
  `.signup(user)`
  `.logout()`
  `.validate()`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please enter a password"] },
  imageProfile: { type: String, default: "" },
  name: { type: String, required: [true, "Please enter a name"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favourites: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}
```

**Restaurant model**

```javascript
 {
name: { type: String, required: true },
  imageUrl: { type: String },
  contact: { type: Number, required: true },
  address: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  averagePrice: { type: Number, required: true},
  location: {
    address: String,
  },
 }
```

**Comments model**

```javascript
 {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    content: { type: String, required: true},
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }
```

<br>

# Server / Backend

## Models

**User model**

```javascript
{
email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please enter a password"] },
  imageProfile: { type: String, default: " " },
  name: { type: String, required: [true, "Please enter a name"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favourites: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}
```

**Restaurant model**

```javascript
 {
name: { type: String, required: true },
  imageUrl: { type: String },
  contact: { type: Number, required: true },
  address: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  averagePrice: { type: Number, required: true},
  location: {
    address: String,
  },
 }
```

**Comments model**

```javascript
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    content: { type: String, required: true},
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }

```

<br>

## API's

- Cloudinary;

<br>

## Bonus

- random restaurant;
- interaction with Instagram;

<br>

## Packages

<br>

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link]()

[Server repository Link]()

[Deployed App Link]()

### Contributors

Raquel Poletto
