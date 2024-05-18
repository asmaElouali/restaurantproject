const MenuData = [
     {
          id: 'C1',
          index: 0,
          name: "Entrées",
          subcategories: [
               {
                    name: "Salades",
                    ima: require("../assets/images/salade/saladfile.png"),
                    items: [
                         {   
                              index: 0,
                              name: "Salade César",
                              description: "Laitue, poulet grillé, parmesan, croûtons, sauce César",
                              price: 10.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         },
                         {
                              index: 1,
                              name: "Salade Niçoise",
                              description: "Thon, haricots verts, olives, œufs durs, vinaigrette à l'huile d'olive",
                              price: 12.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         }
                    ],
               },
               { 
                    name: "Soupes",
                    ima: require("../assets/images/salade/saladfile.png"),
                    items: [
                         {
                              index: 2,
                              name: "Soupe à l'oignon",
                              description: "Soupe traditionnelle française à l'oignon, gratinée avec du fromage",
                              price: 8.99,
                              ima: require("../assets/images/salade/saladfile.png"),
                              favourite: false,
                         },
                         {
                              index: 3,
                              name: "Soupe du jour",
                              description: "Soupe du jour préparée avec des ingrédients frais",
                              price: 7.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         }
                    ],

               }
          ],


     },
     {
          id: 'C2',
          index: 1,
          name: "Plats Principaux",
          subcategories: [
               {

                    name: "Pâtes",
                    ima: require("../assets/images/salade/saladfile.png"),
                    items: [
                         {
                              index: 4,
                              name: "Spaghetti Carbonara",
                              description: "Spaghetti, pancetta, œufs, parmesan, poivre noir",
                              price: 14.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         },
                         {
                              index: 5,
                              name: "Raviolis aux champignons",
                              description: "Raviolis farcis aux champignons sautés, sauce crémeuse",
                              price: 16.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         }
                    ],
               },
               {
                    name: "Plats de Viande",
                    ima: require("../assets/images/salade/saladfile.png"),
                    items: [
                         {
                              index: 6,
                              name: "Filet Mignon",
                              description: "Filet mignon grillé servi avec sauce au poivre et légumes grillés",
                              price: 29.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         },
                         {
                              index: 7,
                              name: "Poulet rôti",
                              description: "Poulet rôti cuit lentement, servi avec purée de pommes de terre",
                              price: 18.99,
                              ima: require("../assets/images/salade/salade.jpg"),
                              favourite: false,
                         }
                    ],
               }
          ],
     },



];
export default MenuData;