import xlsx from 'node-xlsx';

function Load(Path: string) {
    const workSheetsFromFile = xlsx.parse(Path);
    //console.log(workSheetsFromFile)
    return workSheetsFromFile
}
function ParseModelData(Bigdata: {
    name: string;
    data: any[][];
}[]) {
    const UniCompendiumData = Bigdata[0].data // Uni Data Header
    const UniNameList = UniCompendiumData[0]  // Uni Name Data
    const UniCount = UniNameList.length - 1   // remove the top header



    var TotalFacultyCount = 0
    var TotalBranchCount = 0
    const ModelSkillData: any[][] = []
    const ModelInterestData: any[][] = []
    const ModelKeyData: string[] = []

    for (var i = 1; i <= UniCount; i++) {
        const IndexedUniData = Bigdata[i];
        const UniName = IndexedUniData.name
        const UniInfo = IndexedUniData.data

        const FacultyCount = UniInfo[0].length - 1//the faculty name list
        //we are going to transfer these info into permanent more efficient data storages later
        // wip
        const SkillUni = UniInfo.filter(
            (x) => (!(typeof x[0] === 'undefined') && x[0].includes("ความถนัด"))
        )
        const InterestUni = UniInfo.filter(
            (x) => (!(typeof x[0] === 'undefined') && x[0].includes(" วิชา"))
        )
        //console.log(SkillUni)
        //console.log(UniName)
        for (var j = 1; j <= FacultyCount; j++) {
            //console.log(`->${UniInfo[0][j]}`)
            TotalFacultyCount++

            const FacultyName = UniInfo[0][j]

            const branchesInfo = UniInfo[2][j]
            if (typeof branchesInfo === 'undefined') {
                continue
            }

            const branches = branchesInfo.split("\n").map(
                (branch: string) => branch.split(" ")[1]
            )
            //console.log(branches)
            //i know shit lookup time but this isnt run often
            TotalBranchCount += branches.length

            if (!(typeof SkillUni[0][j] === 'undefined') && !(typeof InterestUni[0][j] === 'undefined')) {
                const SkillFacultyData = SkillUni.map((x) => {
                    var t = 0;
                    var c = 0;
                    x[j].split("\n").forEach((e: string) => {
                        t += Number(e.split(" ")[1].split("%")[0]);
                        c += 100
                    });
                    return [x[0], t / c];//scary, also yea its x bar
                }
                )
                const InterestFacultyData = InterestUni.map((x) => {
                    var t = 0;
                    var c = 0;
                    x[j].split("\n").forEach((e: string) => {
                        t += Number(e.split(" ")[1].split("%")[0]);
                        c += 100
                    });
                    return [x[0], t / c];//scary, also yea its x bar
                }
                )

                //console.log(SkillFacultyData,InterestFacultyData)

                ModelSkillData.push(SkillFacultyData)
                ModelInterestData.push(InterestFacultyData)
                ModelKeyData.push(`${UniName}/${FacultyName}`)
            }
        }
    }
    return [ModelSkillData, ModelInterestData, ModelKeyData]
}


export default { Load , ParseModelData };