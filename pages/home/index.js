import React from "react";
import { Button, Heading, Image, SimpleGrid, Text } from "@chakra-ui/core";

const home = () => {
  return (
    <div>
      <SimpleGrid columns={4} spacing={10}>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
          <Heading as="h3" size="lg">
            Gestión de productos
          </Heading>
          <Text fontSize="md">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est.
          </Text>
          <Button variantColor="blue" variant="solid" size="lg" width="250px">
            Ir
          </Button>
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
        <div>
          <Image
            src="https://i1.wp.com/blog.jpries.com/wp-content/uploads/2015/12/AdventureWorks-Logo_blog.jpg"
            alt="AdventureWorks"
            align="center"
          />
        </div>
      </SimpleGrid>
    </div>
  );
};

export default home;
