const buttons = [
    { 
        title: "Generar diamante",
        command: "give {0} minecraft:diamond 1",
        needUser: true
    },
    { 
        title: "Generar tnt",
        command: "give {0} minecraft:tnt 1",
        needUser: true
    },
    { 
        title: "Generar comida",
        command: "give {0} minecraft:cooked_beef 1",
        needUser: true
    },
    { 
        title: "Generar zombie",
        command: "summon zombie",
        needUser: false
    }
];

export default buttons