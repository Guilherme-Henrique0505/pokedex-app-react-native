// components/Details.js

import { useState, useEffect } from 'react';
import { Text, ActivityIndicator, Share } from 'react-native';
import styled from 'styled-components/native';
import Wrapper from './Wrapper';

// -------------------------------------------- Tipos --------------------------------------------

const getTypeColor = (type) => {
  switch (type) {
    case 'grass': return '#478053';
    case 'fire': return '#EE8130';
    case 'water': return '#6390F0';
    case 'electric': return '#F7D02C';
    case 'bug': return '#A6B91A';
    case 'normal': return '#A8A77A';
    case 'poison': return '#A33EA1';
    case 'ground': return '#E2BF65';
    case 'fairy': return '#D685AD';
    case 'fighting': return '#C22E28';
    case 'psychic': return '#F95587';
    case 'rock': return '#B6A136';
    case 'ghost': return '#735797';
    case 'ice': return '#96D9D6';
    case 'dragon': return '#6F35FC';
    case 'dark': return '#705746';
    case 'steel': return '#B7B7CE';
    case 'flying': return '#A98FF3';
    default: return '#A8A77A';
  }
};
const shareIcon = require('../Assets/Images/Share-Icon.png')
const statAbbreviations = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Spe',
};
// -------------------------------------------- Styles --------------------------------------------

// ----------------------- ShareButton -----------------------

const ShareIconButton = styled.TouchableOpacity`
position: absolute;
top: 20px;
right: 20px;
padding: 10px;
background-color: transparent; 
`;

const ShareIconImage = styled.Image`
width: 20px;
height: 20px;
resizeMode: 'contain';
`;

// ----------------------- BackGround -----------------------

const PageBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor || '#ccc'};
`;

const DetailsContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  top: 214px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

// ----------------------- PokemonName -----------------------

const PokemonName = styled.Text`
  font-size: 24px;
  font-family: "KronaOne";
  color: #000;
  margin-top: 71px;
  text-transform: capitalize;
  text-align: center;
`;

// ----------------------- PokemonDescription -----------------------

const PokemonDescription = styled.Text`
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 400;
  color: #323232;
  text-align: center;
  line-height:17px;
  margin-bottom: 0px;
  width: 100%;
`;

const DescriptionBox = styled.View`
  width: 100%;
  height: auto;
  padding: 10px;
  margin-bottom: 5px;
  align-self: center;
`;

// ----------------------- PokemonType -----------------------

const TypeTagContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

const TypeTag = styled.View`
  background-color: ${(props) => getTypeColor(props.type)};
  border-radius: 8px;
  margin-top: 15px;
  padding: 7px 9px;
  min-width: 80px;
  align-items: center;
  justify-content: center;
`;

const TypeText = styled.Text`
  font-family: "Open Sans";
  font-weight: 400;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
`;

// ----------------------- PokemonSprite -----------------------

const PokemonFloatingImage = styled.Image`
  width: 234px;
  height: 240px;
  resize-mode: contain;
  position: absolute;
  top: 4%;
  align-self: center;
  z-index: 2;
`;

// ----------------------- PokemonStats -----------------------

const StatsRowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 41px;
  width: 100%;
  margin-top: 10px;
`;

const StatColumn = styled.View`
  align-items: center;
`;

const WeightHeightValue = styled.Text`
  font-size: 32px;
  font-family: "Open Sans";
  font-weight: 700;
  color: #333;
  margin-bottom: 2px;
`;

const SeparatorLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: #E5E5E5;
  margin-horizontal: 20px;
`;

// ----------------------- PokemonBaseStats -----------------------

const WeightHeightLabel = styled.Text`
  font-size: 12px;
  font-family: "Open Sans";
  color: #000;
  text-transform: uppercase;
`;

const StatsContainer = styled.View`
  justify-content: center;
`;

const StatsSection = styled.View`
  width: 100%;
  height: auto;`;

const StatsTitle = styled.Text`
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 600;
  color: #000;
  margin-top: 5px;
  margin-bottom: 16px;
  align-self: center;
  text-transform: uppercase;
`;

const StatName = styled.Text`
  text-align: left;
  font-size: 16px;
  color: ${(props) => props.statColor || '#333'};
  font-family: "Open Sans";
  font-weight: 400;
  text-transform: uppercase;
  min-width: 60px;
`;

const StatValue = styled.Text`
  font-weight: 400;
  font-size: 16px;
  font-family: "Open Sans";
  color: #000;
  min-width: 40px;
  text-align: right;
`;

const StatsBarContainer = styled.View`
  flex: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  margin-left: 15px;
`;

const StatRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  padding-horizontal: 39px;
  justify-content: space-between;
`;

const StatsBar = styled.View`
  height: 100%;
  background-color: ${(props) => props.barColor || '#6390F0'};
  border-radius: 50px;
  width: ${(props) => `${(props.value / 255) * 100}%`};
`;

// -------------------------------------------- ComponentsConection --------------------------------------------

export default function Details({ route }) {
  const { pokemonName, pokemonId } = route.params;

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);

  useEffect(() => {
    const fetchPokemonDetailsAndSpecies = async () => {
      try {
        setLoading(true);
        setError(null);

        // ----------------------- FIRST REQUEST: GENERAL DETAILS -----------------------

        const detailsResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`
        );
        if (!detailsResponse.ok)
          throw new Error(`Pokémon "${pokemonName}" não encontrado!`);
        const detailsData = await detailsResponse.json();
        setPokemonDetails(detailsData);

        // ----------------------- SECOND REQUEST: SPECIES DATA (for flavor text) ---------

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`
        );
        if (!speciesResponse.ok)
          throw new Error(
            `Dados da espécie de "${pokemonName}" não encontrados!`
          );
        const speciesData = await speciesResponse.json();

        const englishDescription = speciesData.flavor_text_entries.find(
          (entry) =>
            entry.language.name === 'en' && entry.flavor_text.length > 50
        );

        if (!englishDescription) {
          const anyDescription = speciesData.flavor_text_entries.find(
            (entry) => entry.flavor_text.length > 50
          );
          setPokemonDescription(
            anyDescription
              ? anyDescription.flavor_text
              : 'Descrição não disponível.'
          );
        } else {
          setPokemonDescription(englishDescription.flavor_text);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do Pokémon:', err);
        setError(err.message || 'Falha ao carregar detalhes.');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonName) {
      fetchPokemonDetailsAndSpecies();
    }
  }, [pokemonName]);

  // ----------------------- Dinamic Color -----------------------

  const mainType = pokemonDetails?.types[0]?.type.name;
  const pageBgColor = getTypeColor(mainType);
  const statsColor = getTypeColor(mainType);

  const onShare = async () => {
    if (!pokemonDetails) return;

    // ----------------------- Shared Mensage -----------------------

    let statsMessage = pokemonDetails.stats
      .map((statInfo) => {
        const statName =
          statAbbreviations[statInfo.stat.name] ||
          statInfo.stat.name.toUpperCase();
        return `${statName}: ${statInfo.base_stat}`;
      })
      .join(', ');

    const message =
      `LOOK AT THE ${pokemonDetails.name.toUpperCase()} IN POKEDEX!\n\n*ID:* _#${
        pokemonDetails.id
      }_\n` +
      `*TYPE:* _${pokemonDetails.types
        .map((t) => t.type.name)
        .join(', ')
        .toUpperCase()}_\n` +
      `*ABILITIES:* _${pokemonDetails.abilities
        .map((a) => a.ability.name.replace(/-/g, ' '))
        .join(', ')
        .toUpperCase()}_\n` +
      `*BASE STATS:*\n_${statsMessage}_\n\n` +
      `*LINK:* https://snack.expo.dev/@guilherme_h_basilio/guilherme---taqtile-case?platform=web`;

    try {
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado via:', result.activityType);
        } else {
          console.log('Conteúdo compartilhado com sucesso!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado.');
      }
    } catch (error) {
      alert(`Erro ao compartilhar: ${error.message}`);
      console.error('Erro ao compartilhar:', error);
    }
  };

  // -------------------------------------------- Return --------------------------------------------

  return (
    <Wrapper>

      {/* ----------------------- BackGround ----------------------- */}
      <PageBackground bgColor={pageBgColor}>
        {loading && <ActivityIndicator size={'large'} color="#0000ff" />}
        {error && (
          <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
            {error}
          </Text>
        )}

        {!loading && !error && pokemonDetails && (
          <>

            {/* ----------------------- Share Button ----------------------- */}

            <ShareIconButton onPress={onShare}>
              <ShareIconImage source={shareIcon} />
            </ShareIconButton>

            {/* ----------------------- Pokemon Image ----------------------- */}

            <PokemonFloatingImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonDetails.id}.gif`,
              }}
            />

            {/* ----------------------- Pokemon Type ----------------------- */}

            <DetailsContainer>
              <PokemonName>{pokemonDetails.name}</PokemonName>
              {pokemonDetails.types && pokemonDetails.types.length > 0 && (
                <>
                  <TypeTagContainer>
                    {pokemonDetails.types.map((typeInfo) => (
                      <TypeTag
                        key={typeInfo.type.name}
                        type={typeInfo.type.name}>
                        <TypeText>{typeInfo.type.name}</TypeText>
                      </TypeTag>
                    ))}
                  </TypeTagContainer>
                </>
              )}

              {/* ----------------------- Pokemon Description ----------------------- */}

              {pokemonDescription && (
                <DescriptionBox>
                  <PokemonDescription>{pokemonDescription}</PokemonDescription>
                </DescriptionBox>
              )}

              {/* ----------------------- Weight and Height ----------------------- */}

              <StatsRowContainer>
                <StatColumn>
                  <WeightHeightValue>
                    {(pokemonDetails.height / 10).toFixed(1)} m
                  </WeightHeightValue>
                  <WeightHeightLabel>height</WeightHeightLabel>
                </StatColumn>
                <SeparatorLine></SeparatorLine>
                <StatColumn>
                  <WeightHeightValue>
                    {(pokemonDetails.weight / 10).toFixed(1)} kg
                  </WeightHeightValue>
                  <WeightHeightLabel>weight</WeightHeightLabel>
                </StatColumn>
              </StatsRowContainer>
              <StatsContainer>
                <StatsSection>
                  {' '}

                  {/* ----------------------- Pokemon Stats ----------------------- */}
                  
                  <StatsTitle>Base Stats:</StatsTitle>
                  {pokemonDetails.stats && pokemonDetails.stats.length > 0 && (
                    <>
                      {pokemonDetails.stats.map((statInfo) => (
                        <StatRow key={statInfo.stat.name}>
                          <StatName statColor={statsColor}>
                            {statAbbreviations[statInfo.stat.name] ||
                              statInfo.stat.name.toUpperCase()}
                            :
                          </StatName>
                          <StatValue>{statInfo.base_stat}</StatValue>
                          <StatsBarContainer style={{ flex: 2 }}>
                            <StatsBar
                              value={statInfo.base_stat}
                              barColor={statsColor}
                            />
                          </StatsBarContainer>
                        </StatRow>
                      ))}
                    </>
                  )}
                </StatsSection>
              </StatsContainer>
            </DetailsContainer>
          </>
        )}
      </PageBackground>
    </Wrapper>
  );
}
