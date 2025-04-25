let fs = require('fs');
let { addID } = require('../middlewares/addID.middleware');
const { json } = require('stream/consumers');
let createdata = (request, response) => {

    let newdata = request.body;

    fs.readFile("./db.json", 'utf-8', (err, data) => {
        if (err) {
            return response.status(400).json({
                message: err.message
            });
        }

        let parsedData = JSON.parse(data);
        let heroes = parsedData;
        heroes.push(newdata);
        let updatedHeroes = addID(heroes);
        parsedData.heroes = updatedHeroes;

        fs.writeFile("./db.json", JSON.stringify(parsedData, null, 2), 'utf-8', (err) => {
            if (err) {
                return response.status(400).json({
                    message: err.message
                });
            }

            return response.status(200).json({
                message: "Data created successfully",
                data: newdata
            });
        });
    });
};


let gethero = (request, response) => {
    fs.readFile("./db.json", "utf-8", (error, data) => {
        if (error) {
            return response.status(400).json({
                message: error.message
            })
        }
        let Hero = JSON.parse(data);
        return response.status(200).json({
            message: "Get All Hero",
            Hero
        })
    })
}
let UpdateVillain = (request, response) => {
    let { hero_id } = request.params;
    let { villains } = request.body;

    if (!villains || villains.length === 0) {
        return response.status(400).json({
            message: "Please provide villains data"
        });
    }

    let { name, health } = villains[0];

    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).json({
                message: err.message
            });
        }

        let Maindata = JSON.parse(data);
        let heroes = Maindata.heroes;
        console.log(Maindata)

        let hero = Maindata.find(hero => hero.id == hero_id);

        if (!hero) {
            return response.status(404).json({
                message: "Hero not found"
            });
        }

        if (hero.villains && hero.villains.length > 0) {
            hero.villains[0].name = name;
            hero.villains[0].health = health;
        } else {
            hero.villains = [{ name, health }];
        }

        fs.writeFile('./db.json', JSON.stringify(Maindata, null, 2), 'utf-8', (err) => {
            if (err) {
                return response.status(500).json({
                    message: err.message
                });
            }
            return response.status(200).json({
                message: "Villain name & health updated successfully!"
            });
        });
    });
}


let deleteheros = (request, response) => {
    let { hero_id } = request.params;

    try {

        fs.readFile("./db.json", 'utf-8', (err, data) => {
            if (err) {
                message: err.message
            }
            let Maindata = JSON.parse(data);



            let updateHeroes = Maindata.filter((hero) => hero.id != hero_id);
            fs.writeFile("./db.json", JSON.stringify(updateHeroes), "utf-8", (err) => {
                if (err) {
                    return response.status(400).json({
                        message: err.message
                    })
                }
                response.status(200).json({
                    message: "Delelte Successfull"
                })
            })


        })

    } catch (error) {
        return response.status(400).json({
            message: error.message
        })
    }


}


module.exports = { createdata, gethero, UpdateVillain, deleteheros };
