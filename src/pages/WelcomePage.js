import ProfilePageLinks from "../components/ui/ProfilePageLinks";

///////////////////////////////////////////////////////////////////
// Component that displays some information about the profile page.
///////////////////////////////////////////////////////////////////
const WelcomePage = () => {
  return (
    <div>
      <ProfilePageLinks />
      <div className="flex flex-col justify-center items-center p-10 gap-10">
        <p className="text-center text-[22px] text-white font-medium bg-[#246bce] w-full p-5 rounded-xl">
          Welcome!
        </p>
        <p className="text-center text-[20px] text-white font-medium bg-[#6597dc] w-full p-5 rounded-xl">
          In the <span class="bg-red-400 p-1 rounded-xl">Favorites</span> tab,
          you can see and edit the pokemon you have added to your favorites. You
          can add a pokemon to your favorites list by clicking the heart next to
          its name. But the heart icon is only visible if you are logged in.
        </p>
        <p className="text-center text-[20px] text-white font-medium bg-[#6597dc] w-full p-5 rounded-xl">
          In the <span class="bg-amber-400 p-1 rounded-xl">Settings</span> tab,
          you will find the settings related to your account. You can change
          your email address or password linked to your account. You can delete
          just your favorite pokemons. You can also completely delete your
          account from the database.
        </p>
        <p className="text-center text-[20px] text-white font-medium bg-[#6597dc] w-full p-5 rounded-xl">
          Please note that deletions cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
