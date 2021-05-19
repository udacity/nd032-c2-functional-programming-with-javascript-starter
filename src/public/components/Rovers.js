const Rovers = (state) => {
  const { rovers } = state;

  return `${rovers
    .map((rover) => {
      const { name, launchDate, landingDate, status, recentPhotos } = rover;

      // TODO: fetch & display recentPhotos
      console.log(recentPhotos);

      return `
      <dl>
        <dd>name</dd>
        <dt>${name}</dt>
        <dd>Launch Date</dd>
        <dt>${launchDate}</dt>
        <dd>Landing Date</dd>
        <dt>${landingDate}</dt>
        <dd>status</dd>
        <dt>${status}</dt>
      </dl>
  `;
    })
    .join("")}`;
};

export default Rovers;
