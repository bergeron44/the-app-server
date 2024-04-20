const package = require('../models/Packages')

const getPackageByPrice= (packageName) => {
    return package.findOne({packageName})

}
const getPackageId= (packageId) => {
    return package.findOne({_id:packageId})

}
const getAllPackages = () => {
    return package.find({})
}

const addPackages =(packageObject) =>{
    package = new Category(packageObject)
    return package.save()
}

const removePackageByName = (packageName) => {
    return package.findOneAndRemove({packageName})
}
const removePackageById = (packageId) => {
    return package.findOneAndRemove({ _id: ObjectId(packageId) })
}

const removeAllPackagesFromList = (packagesIdList) => {
    packagesIdList.forEach(packageId => {
        package.findOneAndRemove({ _id: ObjectId(packageId) })
    })
}

const updatePackageById = (packageId, newContent) => {
    return package.findOneAndUpdate({_id:packageId}, newContent, {new:true})
}

module.exports = {
    getPackageByPrice,
    getPackageId,
    getAllPackages,
    addPackages,
    removePackageByName,
    removePackageById,
    removeAllPackagesFromList,
    updatePackageById,
}