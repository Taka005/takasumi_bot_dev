async function soccer(message){
  const config = require("../../config.json")
  if(message.content === `${config.prefix}soccer`){
    const positions = {
      left: '_ _                   π₯π₯π₯\n_ _                   π΄οΈ\n      \n_ _                         β½',
      middle: '_ _                   π₯π₯π₯\n_ _                        π΄οΈ\n      \n_ _                         β½',
      right: '_ _                   π₯π₯π₯\n_ _                              π΄οΈ\n      \n_ _                         β½',
    };
    let randomized = Math.floor(Math.random() * Object.keys(positions).length);
    let gameEnded = false;
    let randomPos = positions[Object.keys(positions)[randomized]];
    const componentsArray = [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 'SECONDARY',
            custom_id: 'left',
            label: 'ε·¦',
          },
          {
            type: 2,
            style: 'PRIMARY',
            custom_id: 'middle',
            label: 'ηγδΈ­',
          },
          {
            type: 2,
            style: 'SECONDARY',
            custom_id: 'right',
            label: 'ε³',
          },
        ],
      },
    ];
    const msg = await message.channel.send({
      content: randomPos,
      components: componentsArray,
    });
    function update(){
      randomized = Math.floor(Math.random() * Object.keys(positions).length);
      randomPos = positions[Object.keys(positions)[randomized]];
        msg.edit({
          content: randomPos,
          components: componentsArray,
        });
    }
    setInterval(() => {
      if(gameEnded == false) return update();
    }, 800);
    const filter = button => {
      return button.user.id === message.author.id;
    };
    const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });
    if(button.customId !== Object.keys(positions)[randomized]){
      gameEnded = true;
      return button.reply({ content: 'εε©!' });
    }else{
      gameEnded = true;
      return button.reply({ content: 'ζε...' });
    }
  }
}

module.exports = soccer