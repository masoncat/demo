const fs = require('fs');
const path = require('path');
const axios = require('axios');

function isExist(fileName){
    const filePath = path.resolve(__dirname, 'json');
    const file = `${filePath}/${fileName}.json`;
    const is = fs.existsSync(file);
    if (!is){
        console.log("缺失", fileName)
    }
}

function upload(response, fileName){
    const filePath = path.resolve(__dirname, 'json');
    const file = `${filePath}/${fileName}.json`;
    const content = JSON.stringify(response.data);
    fs.writeFile(file, content, (error, data) => {
        if (error){
            console.log('error', error);
            console.log('data', data)
        }
    });
}
const emptyList = [];

axios.get('https://geo.datav.aliyun.com/areas/bound/100000_full.json')
    .then(response => {

        let features = response.data.features;
        features.forEach((feature) => {
            const url = `https://geo.datav.aliyun.com/areas/bound/${feature.properties.adcode}_full.json`;
            axios.get(url).then(response => {
                upload(response, `${feature.properties.adcode}_full`);
                let features = response.data.features;
                features.forEach((feature) => {

                    //真正上传
                    if (!isExist(feature.properties.adcode)){
                        const fileUrl = `https://geo.datav.aliyun.com/areas/bound/${feature.properties.adcode}.json`;
                        axios.get(fileUrl).then(response => {
                            upload(response, `${feature.properties.adcode}`);
                        }).catch(error=>{
                            emptyList.push({
                                fileUrl,
                                name: feature.properties.name,
                                parent:feature.properties.parent.adcode
                            })
                        })
                    }
                    console.log("缺失数组", JSON.stringify(emptyList));
                })
            }).catch(error=>{
            })

            //真正上传
            if (!isExist(feature.properties.adcode)){
                const fileUrl = `https://geo.datav.aliyun.com/areas/bound/${feature.properties.adcode}.json`;
                axios.get(fileUrl).then(response => {
                    upload(response, `${feature.properties.adcode}`);
                }).catch(error=>{
                    emptyList.push({
                        fileUrl,
                        name: feature.properties.name,
                        parent:feature.properties.parent
                    })
                })
            }

        })

        //真正上传
        if (!isExist('100000')){
            const fileUrl = `https://geo.datav.aliyun.com/areas/bound/100000.json`;
            axios.get(fileUrl).then(response => {
                upload(response, '100000');
            }).catch(error=>{
                console.log('请求异常',error)
            })
        }
    })
    .catch(error => {
    });


