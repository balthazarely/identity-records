import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { pageTransition } from '../animations/animation';
import AlbumSlider from '../components/AlbumSlider';
import { LowerPageContainer } from '../styles/pageElements';
import AnotherSlider from '../components/AnotherSlider';

export default function HomePage({ data }) {
  const allCovers = data.allCovers.nodes;
  const newReleases = data.newReleases.nodes;
  const melodicTechno = data.newMelodicTechno.nodes;
  const deepHouse = data.newDeepHouse.nodes;
  const featuredArtists = data.featuredArtists.nodes;

  const myRef = useRef(null);

  return (
    <>
      <motion.div
        className="w-full"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageTransition}
      >
        <AnotherSlider allCovers={allCovers} />
        <LowerPageContainer ref={myRef}>
          <AlbumSlider
            allAlbums={featuredArtists}
            sectionTitle="Featured Artists"
            routeTo="artists"
            showSeeBtn
          />
          <AlbumSlider
            allAlbums={newReleases}
            sectionTitle="New Releases"
            routeTo="releases"
            showSeeBtn
          />
          <AlbumSlider
            allAlbums={melodicTechno}
            sectionTitle="New Melodic House and Techno"
            routeTo="releases"
            showSeeBtn
          />
          <AlbumSlider
            allAlbums={deepHouse}
            sectionTitle="New Deep House"
            routeTo="releases"
            showSeeBtn
          />
        </LowerPageContainer>
      </motion.div>
    </>
  );
}

export const query = graphql`
  query TestQuery {
    allCovers: allSanityCovers {
      nodes {
        name
        id
        description
        release
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 1000) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    newReleases: allSanityAlbums(
      sort: { order: DESC, fields: releaseDate }
      limit: 5
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        artist {
          name
        }
        genre {
          name
        }
        releaseDate(formatString: "YYYYMMDD")
        image {
          asset {
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    newMelodicTechno: allSanityAlbums(
      filter: {
        genre: {
          elemMatch: { slug: { current: { eq: "melodic-house-and-techno" } } }
        }
      }
      sort: { fields: releaseDate, order: DESC }
      limit: 5
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    newDeepHouse: allSanityAlbums(
      filter: {
        genre: { elemMatch: { slug: { current: { eq: "deep-house" } } } }
      }
      sort: { fields: releaseDate, order: DESC } # limit: 5
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    featuredArtists: allSanityArtist(filter: { featured: { eq: true } }) {
      nodes {
        name
        id
        featured
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;