const packageModel = require("../models/packageModel");

async function GetAllPackages() {
    const packages = await packageModel.find({});
    return packages;
}

async function GetPackageById(id) {
    const package = await packageModel.findById(id);
    return package;
}

async function DeletePackageById(id) {
    const deletedPackage = await packageModel.findByIdAndDelete(id);
    return deletedPackage;
}

async function UpdatePackageById(id, data) {
    const updatedPackage = await packageModel.findByIdAndUpdate(id, data, {
        new: true, // return the updated document
    });
    return updatedPackage;
}

async function InsertPackageDetails(csvPath) {
    console.log("csvPath", csvPath);
    const packageRecords = await new Promise((resolve, reject) => {
        const parser = parse({ columns: true }, (err, records) => {
            if (err) {
                reject(err);
            } else {
                resolve(records);
            }
        });
        fs.createReadStream(csvPath).pipe(parser);
    });

    const packageModels = packageRecords.map((packageRecord) => new packageModel(packageRecord));
    const results = await packageModel.insertMany(packageModels);

    console.log("package detail results", results);
    return results;
}

module.exports = {
    GetAllPackages,
    GetPackageById,
    DeletePackageById,
    UpdatePackageById,
    InsertPackageDetails
};
