// components/List.js

import * as React from 'react';
import {View, FlatList, Image} from 'react-native';
import styled from 'styled-components/native';
import Wrapper from './Wrapper';

// -------------------------------------------- Assets --------------------------------------------

const PokeballIcon = require('../Assets/Images/pokeball-icon.png');
const PokedexLogo = require('../Assets/Images/pokedex-logo.png');
const SearchIcon = require('../Assets/Images/search-icon.svg')

// -------------------------------------------- Styles --------------------------------------------

// ----------------------- PokedexLogo  -----------------------
const LogoImage = styled.Image`
  margin: 20px;
  height: 39px;
  align-self: center;
  width: 129px;
`;

// ----------------------- Text Filter -----------------------
const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  margin-horizontal: 8px;
  margin-bottom: 0px;
  background-color: #fff;
`;

const SearchInput = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 16px;
`;

const SearchIconImage = styled.Image`
  width: 20px;
  margin-horizontal: 10px;
  height: 20px;
  color: #fff;
  resize-mode: contain;
`;

// ----------------------- Pokemon Name -----------------------
const PokemonName = styled.Text`
  font-size: 17px;
  font-family: "Montserrat";
  font-weight: 600;
  color: #000;
  margin-left: 19px;
  text-transform: capitalize;
`;

// ----------------------- Pokemon ID -----------------------
const PokemonIdText = styled.Text`
  font-size: 12px;
  font-family: "Montserrat";
  font-weight: 500;
  color: #565656;
  margin-left: 25px;
  margin-top: 4px;
  text-transform: capitalize;
`;

// ----------------------- Pokemon Sprite -----------------------
const PokemonSprite = styled.Image`
  width: 71px;
  height: 70px;
  resize-mode: contain;
`;

// ----------------------- List Container -----------------------
const ListItemContainer = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 20px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  flex-direction: row;
  align-items: center;
`;

const ListContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 8px;
`;

// -------------------------------------------- ComponentsConection --------------------------------------------

export default function List({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [allPokemonList, setAllPokemonList] = React.useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');

// ----------------------- List Container -----------------------
  React.useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
        const data = await response.json();

        const processedPokemonList = data.results.map(pokemon => {
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2];
          return {
            ...pokemon,
            id: id
          };
        });

        setAllPokemonList(processedPokemonList);
        setFilteredPokemonList(processedPokemonList);

      } catch (err) {
        console.error("Erro ao buscar Pokémon da API:", err);
        setError("Falha ao carregar Pokémon. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

// ----------------------- Text Filter -----------------------
  React.useEffect(() => {
    if (searchText === '') {
      setFilteredPokemonList(allPokemonList);
    } else {
      const lowercasedSearchText = searchText.toLowerCase();
      const filtered = allPokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(lowercasedSearchText)
      );
      setFilteredPokemonList(filtered);
    }
  }, [searchText, allPokemonList]);

// ----------------------- PokedexList -----------------------
const renderPokemonItem = ({ item }) => (
  <ListItemContainer onPress={() => navigation.navigate('Detalhes', { pokemonName: item.name, pokemonId: item.id })}>
    <PokemonSprite
      source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png` }}
    />
    <View>
      <PokemonName>{item.name}</PokemonName>
      <PokemonIdText>ID: #{item.id}</PokemonIdText>
    </View>
    <Image
      source={PokeballIcon}
      style={{ width: 70, height: 70, marginLeft: 'auto' }}
    />

    
  </ListItemContainer>
);

// -------------------------------------------- Return --------------------------------------------

 return (
   
    <Wrapper>
      <LogoImage source={PokedexLogo} />

      {/* ----------------------- Text Filter ----------------------- */}
      <SearchContainer>
      <SearchIconImage source={SearchIcon} />
        <SearchInput
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        
      </SearchContainer>
      {/* ----------------------- ListContainer ----------------------- */}

      {!loading && !error && filteredPokemonList.length > 0 && (
        <ListContainer>
          <FlatList
            data={filteredPokemonList}
            renderItem={renderPokemonItem}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={null}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ListContainer>
      )}
    </Wrapper>
  );
}