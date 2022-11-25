function csvToJson(seed, exceptions) {
  const header = seed.next().toString().split(",");
  let line;
  const jsonData = [];

  while ((line = seed.next())) {
    const stringLine = line.toString().split(",");

    stringLine.forEach((element, index) => {
      const newObj = {};

      // Exceptions have to be added manually as relationships
      if (!exceptions.includes(header[index]))
        newObj[header[index]] =
          isNaN(Number(element)) || element === "" ? element : Number(element);

      jsonData.push(newObj);
    });
  }
  return jsonData;
}

module.exports = csvToJson;
