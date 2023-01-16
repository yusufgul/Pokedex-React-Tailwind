<a name="readme-top"></a>
# Pokedex
According to the Wikipedia,
>The Pokédex is an electronic device created and designed to catalog and provide information regarding the various species of Pokémon featured in the Pokémon video game, anime and manga series.</br>
>
As for this project, it is a React project that fetches data from the [PokeAPI](https://pokeapi.co/) 
and displays Pokemons on the screen. Tailwinds CSS framework used for styling.
It includes several notable features such as pagination, filtering, 
routing, authentication and Redux.

## Demo link:</br>
https://pokedex-eb63b.web.app</br>

## Why this project?

I was looking for an idea to make a frontend project and then I came across [PokeAPI](https://pokeapi.co/).
It is a full RESTful API linked to an extensive database detailing everything about the Pokémon main game series.
I decided to do this project because of the extensive data it provided and
also because it made me feel nostalgic. Working on this project was a fun experience.</br>
![Pikachu](https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png)   ![Bulbasaur](https://archives.bulbagarden.net/media/upload/7/76/Spr_5b_001.png)  ![Charmander](https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png)  ![Squartel](https://archives.bulbagarden.net/media/upload/5/59/Spr_5b_007.png) ![Psyduck](https://archives.bulbagarden.net/media/upload/3/39/Spr_5b_054.png) ![Butterfree](https://archives.bulbagarden.net/media/upload/7/7c/Spr_5b_012_m.png) 
<p align="right">(<a href="#readme-top">back to top</a>)</p>
</br>

## Features </br>
- Tailwinds:
  - As for the CSS framework, Tailwind is used.
- Authentication:
  - Firebase Authentication is used to handle authentications.
  - User can create a profile with an email and a password. 
  - When token expires, user will automatically log out.
  - Otherwise, the token is stored in the browser and user will stay logged in even if user leaves the page.</br>
- Redux: 
  - The project uses Redux for state management.</br>
- Routing: 
  - The project uses React Router for routing.</br>
- Favorite Pokemons:
  - Firebase Firestore Database is used to store favorite pokemon data. 
  - User will be able to add Pokemons to favorites list after logging in. 
  - User can see and organize favorite Pokemons through the favorites page.</br>
- Filtering: 
  - User can filter Pokemons by their type and name, sort them with their name or ID number.
  - User can also change the displayed picture between static and animated images for Pokemons.
  - Reset button can be used to undo all filtering and sorting.</br>
- Pagination: 
  - Easily navigate through different pages and select a number from the dropdown menu to quickly go to that page. </br>
- Responsive Design: 
  - The project is responsive for all screen sizes, from small mobile phones to computer screens.</br>
- User Settings: 
  - User can change email and password from the settings page. 
  - User can also delete favorite Pokemons list or account completely.</br>
- Detailed Pokemon Card: 
  - Clicking on a Pokemon card will reveal a detailed and larger Pokemon card. 
- Auto arrange the page:
  - Even if the page size changes, pokemon number gets arranged automatically, so that every row will have the same number of pokemons.</br>
- Error handling and system messages: 
  - Possible errors or events are caught and reported to the user. </br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

    Clone the repository: git clone https://github.com/yusufgul/Pokedex-React-Tailwinds.git
    Add your firebase info to the FirebaseConfig.js file inside /src/components/firebase folder
    Install the dependencies: npm install
    Run the development server: npm start
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screenshots

<div style="display: flex;">
 <img src="https://drive.google.com/uc?export=view&id=1sLK6SQTdNCL7lifn0k3JLbwG_49plSLg" width=25% height=25%>
 <img src="https://drive.google.com/uc?export=view&id=1qydOMlqQPhk97-pHpvgeUW6adFySQ2W6" width=25% height=25%>
 <img src="https://drive.google.com/uc?export=view&id=1Y8FBr5eZr7redtQ1k06EwhDce9SDP6vu" width=25% height=25%>
 <img src="https://drive.google.com/uc?export=view&id=1gg0VJojpeRqagDDI1JuWigyeEZbSNCcQ" width=25% height=25%>
 <img src="https://drive.google.com/uc?export=view&id=1OUdBjF8mfSR89mVnA6AN33kWw4wkENnn" width=25% height=25%>
 <img src="https://drive.google.com/uc?export=view&id=1MvHz3HEGVtstI_1a-gMUfVXasEAscaTJ" width=25% height=25%>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Some Notes

- Big majority of the pokemons have only one or two evolution forms. But some pokemons doesn't follow a linear line of evolution chain. They evolve to different pokemons in a different conditions. For example one of the pokemons can evolve into 8 different ones depending on the stone type he is holding. Their numbers in total pokemons were very small, so I didn't change the project for them. Their evolution information is not wrong but missing some data.
- I didn't include all the pokemons from the api because I didn't quite like new ones. I decided it would be fine even if I don't include 21 meter long Gigantamax Pikachu to the project when I already got 890 pokemon to display.
- Only first 649 pokemon have animated picture available. This is because the images were not produced after that point. Therefore, animated images doesnt exist for rest of the pokemons.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Contributing

If you would like to contribute to the project, please fork the repository and make a pull request.</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### License

This project is licensed under the MIT License.</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Contact

If you have any questions or suggestions, please feel free to contact me.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
