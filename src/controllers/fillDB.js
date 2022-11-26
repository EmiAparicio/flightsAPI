async function fillDB(seed, Model, bundleNum) {
  // Args:
  // 1: nReadlines instance
  // 2: database model
  // 3: bundle of lines to load at once (watch for memory)
  const header = seed.next().toString().split(",");
  let line;
  let lineNum = 1;
  let bundle = [];

  while ((line = seed.next())) {
    const newObj = {};

    const stringLine = line.toString().split(",");
    stringLine.forEach((element, index) => {
      newObj[header[index]] = isNaN(Number(element))
        ? element === ""
          ? null
          : element
        : Number(element);
    });

    Model.create(newObj)
      .then((newObjInDB) => {
        bundle.push(newObjInDB);
      })
      .catch((error) => console.log(error));

    if (lineNum === bundleNum) {
      await Promise.all(bundle);
      bundle = [];
      lineNum = 1;
      return; // Comment this return to fully load seeders
    } else lineNum++;
  }

  if (bundle.length !== 0) await Promise.all(bundle);
}

module.exports = fillDB;
