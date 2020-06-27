<h1 align="center" style="border-bottom: none;">🚀 <동국대학교 아싸리 팀> 인공지능을 이용한 챗봇구축</h1>
<h3 align="center">Watson Assistant를 이용하여, 착한 가격 업소를 추천하는 챗봇을 구축하였다.</h3>
<p align="center">
  <a href="http://travis-ci.org/watson-developer-cloud/assistant-simple">
    <img alt="Travis" src="https://travis-ci.org/watson-developer-cloud/assistant-simple.svg?branch=master">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>
</p>

(readme_images/demo_screenshot.png)

로컬호스트 3000으로 실행했을때, 하남시의 중식을 알려주는 데모 스크린샷입니다.
"하남시 중식 알려줘"라는 해당 text 의 intent 는 "가게 추천"이 0.909%확률로 들어가고, 세부위치entity에 하남시가, 업종에 중식이 들어가서 그에 맞는 답변을 출력하는 형식으로 진행됩니다.

## 음성인식 구현과 한계

1. Watson의 Developer Tool을 이용해 Watson local Git hub에서 Speech to Text, Text to Speech 작업 코드 작성
(readme_images/stt_1.png)
(readme_images/stt_2.png)
1. Watson Developer 과 Assistant를 연결하여 Local app에서 동작 실행
(readme_images/stt_flow.png)
1. 한글 인식률의 부재, json 파일 구조 문제로 인한 음성인식 기술 구현 실패(영어로는 동작하지만, 한글로 동작하지 않음)
(readme_images/stt_understand_eng.png)
(readme_images/stt_understand.png)


## Configuring the application

1. In your IBM Cloud console, open the Watson Assistant service instance

2. Click the **Import workspace** icon in the Watson Assistant service tool. Specify the location of the workspace JSON file in your local copy of the app project:

    `<project_root>/training/bank_simple_workspace.json`

3. Select **Everything (Intents, Entities, and Dialog)** and then click **Import**. The car dashboard workspace is created.

4. Click the menu icon in the upper-right corner of the workspace tile, and then select **View details**.

5. Click the ![Copy](readme_images/copy_icon.png) icon to copy the workspace ID to the clipboard.

    ![Steps to get credentials](readme_images/demo_screenshot.gif)

6. In the application folder, copy the *.env.example* file and create a file called *.env*

    ```
    cp .env.example .env
    ```

7. Open the *.env* file and add the service credentials that you obtained in the previous step. The Watson SDK automatically locates the correct environmental variables for either `username`, `password`, and `url` or the `apikey` and `url` credentials found in the *.env* file.

    Example *.env* file that configures the `apikey` and `url` for a Watson Assistant service instance hosted in the US East region:

    ```
    ASSISTANT_IAM_APIKEY=X4rbi8vwZmKpXfowaS3GAsA7vdy17Qhxxxxxxxx
    ASSISTANT_URL=https://gateway-wdc.watsonplatform.net/assistant/api
    ```

    - If your service instance uses `username` and `password` credentials, add the `ASSISTANT_USERNAME` and `ASSISTANT_PASSWORD` variables to the *.env* file.

    Example *.env* file that configures the `username`, `password`, and `url` for a Watson Assistant service instance hosted in the US South region:

    ```
    ASSISTANT_USERNAME=522be-7b41-ab44-dec3-xxxxxxxx
    ASSISTANT_PASSWORD=A4Z5BdGENxxxx
    ASSISTANT_URL=https://gateway.watsonplatform.net/assistant/api
    ```
    However, if your credentials contain an IAM API key, copy the `apikey` and `url` to the relevant fields.
    ```JSON
      {
        "apikey": "ca2905e6-7b5d-4408-9192-xxxxxxxx",
        "iam_apikey_description": "Auto generated apikey during resource-key ...",
        "iam_apikey_name": "auto-generated-apikey-62b71334-3ae3-4609-xxxxxxxx",
        "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
        "iam_serviceid_crn": "crn:v1:bluemix:public:iam...",
        "url": "https://gateway-syd.watsonplatform.net/assistant/api"
      }
    ```
    ```
    ASSISTANT_IAM_APIKEY=ca2905e6-7b5d-4408-9192-xxxxxxxx
    ```

8. Add the `ASSISTANT_ID` to the previous properties

    ```
    ASSISTANT_ID=522be-7b41-ab44-dec3-xxxxxxxx
    ```

## Running locally

1. Install the dependencies

    ```
    npm install
    ```

1. Run the application

    ```
    npm start
    ```

1. View the application in a browser at `localhost:3000`

## Deploying to IBM Cloud as a Cloud Foundry Application

1. Login to IBM Cloud with the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview)

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space.

    ```
    ibmcloud target --cf
    ```

1. Edit the *manifest.yml* file. Change the **name** field to something unique.  
  For example, `- name: my-app-name`.
1. Deploy the application

    ```
    ibmcloud app push
    ```

1. View the application online at the app URL.  
For example: https://my-app-name.mybluemix.net


## License

This sample code is licensed under Apache 2.0.  
Full license text is available in [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM

Find more open source projects on the
[IBM Github Page](http://ibm.github.io/).


[demo_url]: https://assistant-simple.ng.bluemix.net/
[doc_intents]: https://cloud.ibm.com/docs/services/conversation/intents-entities.html#planning-your-entities
[docs]: https://cloud.ibm.com/docs/services/assistant/index.html#index
[docs_landing]: (https://cloud.ibm.com/docs/services/assistant/index.html#index)
[node_link]: (http://nodejs.org/)
[npm_link]: (https://www.npmjs.com/)
[sign_up]: https://cloud.ibm.com/registration
