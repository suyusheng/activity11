<template>
  <div id="container">
      <div class="main">
            <div class="title">
                <p v-if="showgift">
                    <label>班级剩余名额</label>
                    <span>仅剩{{num}}名</span>
                </p>
                <p>
                    <label>剩余支付时间</label>
                    <span>{{date}}</span>
                </p>
            </div>
            <!-- 填写订单 -->
            <div class="form_cont">
                <form ref="form" action="https://pay.geek-8.com/v2/agent/2021Jan" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="order_cont">
                        <div class="form_list">
                            <label>孩子姓名</label>
                            <input type="text" name="name" placeholder="仅用于老师排课" v-model="form.childName" autocomplete="on">
                        </div>
                        <div class="form_list">
                            <label>手机号</label>
                            <input type="number" name="phone" placeholder="请填写真实手机号" v-model="form.phone" autocomplete="on" pattern="[0-9]*">
                        </div>
                        <div class="form_list">
                            <label>验证码</label>
                            <input type="number" placeholder="请输入验证码" v-model="form.yzm" class="form-code">
                            <span class="span-code" @click="requestVerificationCode" v-html="text"></span>
                        </div>
                        <p class="prompt-text">{{prompt}}</p>
                        <p>
                            <input type="checkbox" id="xieyi" v-model="checkbox">
                            <label for="" @click="openProtocol">已阅读并同意《极客晨星少儿编程购课协议》</label>
                        </p> 
                    </div>
                    <div class="pay_cont">
                        <div class="pay_left">
                            <span>支付方式</span>
                        </div>
                        <div class="pay_right">
                            <div class="pay_wx">
                                <input type="radio" name="channel" id="wechatpay" value="wechatpay" checked="checked" v-model="form.paytype">
                                <label for=""></label>
                                <img src="@/assets/images/wx.png" alt="">
                                <span>微信</span>
                            </div>
                            <div class="pay_zfb">
                                <input type="radio" name="channel" id="alipay" value="alipay" v-model="form.paytype">
                                <label for=""></label>
                                <img src="@/assets/images/zfb.png" alt="">
                                <span>支付宝</span>
                            </div>
                        </div>
                    </div>
                    <div style="display:none">
                        <input type="text" name="classtype" v-model="form.classtype" >
                        <input type="text" name="utm_source" v-model="form.utm_source" >
                        <input type="text" name="successUrl" v-model="form.successUrl" >
                    </div>
                </form>
            </div>
            <!-- 订单信息 -->
            <div class="order_detail">
                <h3>订单信息</h3>
                <ul>
                    <li>课程名称：{{title}}</li>
                    <li>上课时间：每月循环开课</li>
                    <li>订单金额：<span>1</span>元</li>
                    <li v-if="showgift">赠品：价值<span>69.9</span>元文具礼包</li>
                </ul>
                <p><span>【活动优惠】</span><label>-￥398.00</label></p>
            </div>
            <div class="gift_box" v-if="showgift">
                <img src="@/assets/images/gift.png" alt="">
            </div>
            <div class="wrapper" v-show="showprotocol">
                <div>
                    <p class="close-pro" @click="close">关闭</p>
                    <h4>极客晨星少儿编程购课协议</h4>
                    <pre class="pro-info">
        本协议包含用户（以下或称“您”）在使用北京极客晨星科技发展有限公司（以下或称“极客晨星少儿编程”）提供的服务的过程中，双方的基本权利和义务。请您完整地阅读本协议，并充分理解各条款内容。如您对本协议有任何疑问，您可以通过我们的客服热线400-8108918与我们联系。 如果您不同意本协议的任何内容，您应立即停止使用我们服务。当您使用我们提供的任一服务时，即表示您已同意双方应遵守本协议的全部内容。我们建议未成年人在您的监护人的陪同下阅读本协议，并建议未成年人在使用极客晨星少儿编程提供的服务时，寻求监护人的同意和指导。

        郑重声明：
        对于冒用极客晨星少儿编程名义，做出的关于代报名的承诺均与极客晨星少儿编程无关，极客晨星少儿编程将依法追究其民事、行政甚至刑事责任。如广大学员了解到相关情况，欢迎致电极客晨星少儿编程客服热线400-8108918举报。

        一、本协议的适用范围
        本协议适用于极客晨星少儿编程提供的所有服务（以下简称“服务”），您访问极客晨星少儿编程及/或登陆相关客户端使用极客晨星少儿编程提供的服务的行为，均受本协议的约束。 本协议所称“极客晨星少儿编程”是极客晨星少儿编程网站运营者北京极客晨星科技发展有限公司。我们所有的服务均适用本协议。此外，针对某些特定服务，我们还将制定专门的协议或条款，以便更具体地说明我们与您在该特定服务中的权利义务。如相关特定服务的协议或条款与本协议有不一致之处，适用该特定服务的协议或条款。

        二、服务说明
        除本协议另有约定，本协议项下的服务仅指极客晨星少儿编程向用户提供的为用户付费获取的服务、商品详情页展示该等服务的包含的具体内容。主要服务项如下：使用课程网站上课，观看课程视频，获取课程公告，题库（含标准答案及解析），提问并获取答案，下载资料等。您了解并同意，本服务仅依其当前所呈现的状况提供，对于任何用户信息或个人化设定之时效、删除、传递错误、未予储存或其它任何问题，极客晨星少儿编程均不承担任何责任。极客晨星少儿编程保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。

        三、您的注册义务
        为了能使用极客晨星少儿编程提供的各项服务，您同意以下事项：依注册提示填写正确的个人信息，并确保今后更新的手机号、姓名、头像、年龄等资料的有效性和合法性。若您提供任何违法、不道德或极客晨星少儿编程认为不适合在极客晨星少儿编程网站上展示的资料；或者极客晨星少儿编程有理由怀疑你的资料属于程序或恶意操作，极客晨星少儿编程有权暂停或终止您的账号，并拒绝您于现在和未来使用本服务之全部或任何部分。极客晨星少儿编程无须对任何用户的任何注册报名资料承担任何责任，包括但不限于鉴别、核实任何注册报名资料的真实性、正确性、完整性、适用性及是否为最新资料的责任。

        四、用户账号、密码及安全
        成功注册之后，您可使用您的账号和密码，登录您的极客晨星少儿编程账号（下称“账号”）。为了能正常使用极客晨星少儿编程的服务，您应确保您注册的用于接受课程服务的账号及密码的安全性，并同意以下事项：
        4.1 您的账号遭到未获授权的使用，或者发生其它任何安全问题时，您应立即通知极客晨星少儿编程；
        4.2 如果您未保管好自己的账号和密码，因此而产生的对您、极客晨星少儿编程或任何第三方造成的损害，您将负全部责任；
        4.3 如果您的账号或密码丢失，极客晨星少儿编程同意配合您找回，因此造成的损失由您自行承担；
        4.4 您对其账号中的所有行为和事件负全责。

        五、退款说明
        5.1 自课程开课第一天起（含第一天）七日内为试学期。在试学期内乙方有权利提出退费申请。退费申请需由乙方向甲方提交书面申请。试学期内提出退费，甲方将按乙方申请退款时已经结束的课程数扣除相应费用后退还乙方支付的金额。试学期间退费的有效时间为该科目开课第7天24点前，只以学员在系统提交的退费申请时间为准。试学期过后不能退款。
        5.2 享受多阶段连报优惠政策的客户，退费均按照每段的优惠价（即实际付费）退还。乙方在某个阶段（以下称"当前阶段")的试学期结束前提出退费申请，甲方退还尚未完成阶段（含当前阶段）的实际优惠价格。举例说明：如果单阶段价格为3599元，客户按优惠价格6199元一次购买两个阶段的课程，但在第二阶段试学期内退费，实际退费为：6199 - 3599 = 2600元。
        5.3 乙方使用支付宝、微信支付方式缴费，退费收取银行手续费，金额为退费金额的1％。
        5.4 乙方申请退费要退回已开的发票和收据。

        六、调班
        6.1 授课开始前，乙方有权利向甲方申请调班。但只能调入同类型班级的未满员班级。且调课次数不得超过 3 次。
        6.2 开课后三天内可以调班。开课三天后，不能调班。
        6.3 甲方对本次收费网络课程的授课时间保留变更的权利。
        6.4 如果课程付款人数不足6人的，甲方有权取消该期课程，并尽最大努力为乙方安排后期课程


        七、遵守法律
        您同意遵守中华人民共和国相关法律法规的所有规定，如您的行为违反国家法律和法规的任何规定，由您承担全部法律责任。
        如果极客晨星少儿编程有理由认为您的任何行为，包括但不限于您的任何言论和其它行为违反或可能违反国家法律和法规的任何规定，极客晨星少儿编程可在任何时候不经任何事先通知终止向您提供服务。

        八、用户行为
        8.1 您同意将不会利用极客晨星少儿编程提供的网站或商品详情页进行任何违法或不正当的活动，包括但不限于下列行为∶
        8.1.1 发布或以其它方式传送含有下列内容之一的信息：
            8.1.1.1 反对宪法所确定的基本原则的；
            8.1.1.2 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
            8.1.1.3 损害国家荣誉和利益的；
            8.1.1.4 煽动民族仇恨、民族歧视、破坏民族团结的；
            8.1.1.5 破坏国家宗教政策，宣扬邪教和封建迷信的；
            8.1.1.6 散布谣言，扰乱社会秩序破坏社会稳定的，扰乱极客晨星少儿编程课程管理秩序和工作秩序的；
            8.1.1.7 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
            8.1.1.8 侮辱或者诽谤他人，侵害他人合法权利的；
            8.1.1.9 含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；
            8.1.1.10 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；
            8.1.1.11 含有极客晨星少儿编程认为不适合在极客晨星少儿编程展示的内容。
        8.1.2 以任何方式危害他人的合法权益；
        8.1.3 冒充其他任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关；
        8.1.4 将依据任何法律或合约或法定关系（例如由于雇佣关系和依据保密合约所得知或揭露之内部资料、专属及机密资料）知悉但无权传送之任何内容加以发布、发送电子邮件或以其它方式传送；
        8.1.5 将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利（以下简称“专属权利”）之内容加以发布或以其它方式传送；
        8.1.6 将任何广告信函、促销资料、“垃圾邮件”、“滥发信件”、“连锁信件”、“直销”或其它任何形式的劝诱资料加以发布、发送或以其它方式传送；
        8.1.7 将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之计算机病毒，包括但不限于木马程序（Trojan horses）、蠕虫（worms）、定时炸弹、删除蝇（cancelbots）（以下简称“病毒”）或其它计算机代码、档案和程序之任何资料，加以发布、发送或以其它方式传送；
        8.1.8 干扰或破坏与极客晨星少儿编程相关的所有网站服务或与极客晨星少儿编程相关的所有网站相连线之服务器和网络，或违反任何关于与极客晨星少儿编程相关的所有网站连线网络之规定、程序、政策或规范；
        8.1.9 跟踪、人肉搜索或以其它方式骚扰他人；
        8.1.10 故意或非故意地违反任何适用的当地、国家法律，以及任何具有法律效力的规则；
        8.1.11 未经合法授权而截获、篡改、收集、储存或删除他人个人信息、站内邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的。
        8.2 用户认可极客晨星少儿编程未对用户的使用行为进行全面控制，用户使用任何内容时，包括依赖前述内容之正确性、完整性或实用性时，用户同意将自行加以判断并承担所有风险，而不依赖于极客晨星少儿编程。但极客晨星少儿编程依其自行之考虑，拒绝和删除可经由极客晨星少儿编程提供之违反本条款的或其它引起极客晨星少儿编程反感的任何内容,且极客晨星少儿编程有权暂停或终止用户的账号，因此而产生的任何法律责任由用户自行承担。
        8.3 未经用户了解或同意，极客晨星少儿编程应按照法律法规的要求认定必须将用户的个人信息加以保密，不得随意泄露。

        九、直播课堂守则
        为保证直播课堂的正常授课，极客晨星少儿编程制定《直播课堂守则》，您应当了解并遵守，详情如下：              
        <table border="1" cellspacing="0">
            <tr>
            <th>序号</th>
            <th>直播课堂禁止行为</th>
            <th>违反后处理方式</th>
            </tr>
            <tr>
            <td>(1)</td>
            <td>对授课老师、班主任或极客晨星少儿编程工作人员进行辱骂、诋毁、人身攻击或提出本课程以外的其他要求</td>
            <td>冻结账号3天，情节严重者需向老师致歉后方可恢复账号。</td>
            </tr>
            <tr>
            <td>(2)</td>
            <td>学员之间进行互相争辩、辱骂等影响正常授课的行为</td>
            <td>当堂直播课禁言</td>
            </tr>
            <tr>
            <td>(3)</td>
            <td>私自建立QQ群、微信群，对其他学员的个人信息或本课程的学习构成安全隐患</td>
            <td>冻结账号，直至解散相关QQ群、微信群等</td>
            </tr>
            <tr>
            <td>(4)</td>
            <td>复制、发行、出租、出借、出售、散布资料之任何部分或全部极客晨星少儿编程直播课堂提供的全部学习资料，侵犯乙方的知识产权</td>
            <td>停止直播课程，停止资料发放</td>
            </tr>
            <tr>
            <td>(5)</td>
            <td>诋毁极客晨星少儿编程、诋毁极客晨星少儿编程直播课堂</td>
            <td>冻结账号1个月且永久禁言</td>
            </tr>
            <tr>
            <td>(6)</td>
            <td>直播课堂中不断刷屏、发布与本课程无关的内容等</td>
            <td>当堂直播课禁言；若连续两堂直播课刷屏，永久禁言</td>
            </tr>
        </table> 
        除上述处理方式之外，极客晨星少儿编程保留依据相关法律的规定要求您承担其他责任的权利。

        十、国际使用之特别提示
        您已了解国际互联网的无国界性，同意遵守当地所有关于网上行为及内容之法律法规。您特别同意遵守有关从中国或您所在国家或地区输出信息之传输的所有适用法律法规。

        十一、在极客晨星少儿编程发布的公开信息
        11.1 在本协议中，“本服务公开使用区域”系指一般公众可以使用的区域；
        11.2 用户在极客晨星少儿编程上传或发布的内容，用户应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。极客晨星少儿编程在此郑重提请您注意，任何经由极客晨星少儿编程提供的服务而发布、上传的文字、图片或其它资料（以下简称“内容 ”），最终版权均属于极客晨星少儿编程，极客晨星少儿编程可对内容进行编辑整理以及后续的出版行为，而无需要通知用户本人。
        11.3 您已预知使用本服务时，当接触到令人不快、不适当或令人厌恶之内容。在任何情况下，极客晨星少儿编程均不为任何内容负责，但极客晨星少儿编程有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。

        十二、本服务使用的限制
        您同意不对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的,否则须向极客晨星少儿编程承担侵权赔偿责任。

        十三、用户及第三方知识产权保护
        极客晨星少儿编程尊重他人知识产权，呼吁用户也要同样尊重知识产权。极客晨星少儿编程在适当情况下，有权自行决定终止侵害或违反他人权利之使用者的账号。
        如果您对他人的知识产权造成了侵害，极客晨星少儿编程将依国家法律法规的规定，或在适当的情形下，将依其服务条款或其相关规范性规定，删除特定内容或以至终止您对账户的使用。
        若您认为您的作品的著作权遭到侵害或您的知识产权被侵犯，根据《信息网络传播权保护条例》的规定，您需及时与极客晨星少儿编程取得联系并提供详实的举证材料。或请到中华人民共和国国家版权局下载《要求删除或断开链接侵权网络内容的通知》（下称“删除通知”）的示范格式，如果您不明白“删除通知”的内容，请登录中华人民共和国国家版权局查看《要求删除或断开链接侵权网络内容的通知》填写说明。

        十四、关于使用及储存之一般措施及限制
        您承认关于本服务的使用及存储极客晨星少儿编程有权制定一般措施及限制，包含但不限于本服务将保留所发布内容或其它发布内容之最长期间，以及一定期间内您使用本服务之次数上限，及每次使用时间之上限。通过本服务发布或传送的任何信息、通讯资料和其它内容，如被删除或未予储存，您同意极客晨星少儿编程无须承担任何责任。您也同意，极客晨星少儿编程有权依其自行之考虑，不论通知与否，随时变更这些一般措施及限制。

        十五、视频服务
        视频的变更、中断或终止：极客晨星少儿编程因自身产品而引起提供服务的变更，极客晨星少儿编程享有变更权，包括但不限于：
        15.1 极客晨星少儿编程有由于历年教材变更，师资更换等原因，调整每年视频内容长短的权利。
        15.2 极客晨星少儿编程有因为课程内容更新升级，对视频内容调整，覆盖原有课程的权利。
        15.3 极客晨星少儿编程有设置或者变更换课程，赠课流程的权利。
        15.4 您同意极客晨星少儿编程可随时行使以上变更权，并接受极客晨星少儿编程变更后所提供的服务。

        十六、终止服务
        您同意极客晨星少儿编程基于其自行之考虑，因任何理由，包含但不限于缺乏使用，或极客晨星少儿编程认为您已经违反本使用协议的文字及精神，终止您的账号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。您同意依本使用协议中的任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，极客晨星少儿编程可立即关闭或删除您的账号及您账号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或您的账号及相关信息和文件被关闭或删除，极客晨星少儿编程对您或任何第三人均不承担任何责任。

        十七、极客晨星少儿编程的知识产权及保护
        极客晨星少儿编程以及其它极客晨星少儿编程所有网址注册商标、标志及字号、产品、服务名称，均为极客晨星少儿编程之注册商标（以下简称“极客晨星少儿编程标记”）。未经极客晨星少儿编程事先书面同意，您不得将极客晨星少儿编程标记以任何方式展示或使用或作其它处理，或表示您有权展示、使用或另行处理极客晨星少儿编程标记。
        您了解并同意，本服务及本服务所使用之相关软件（以下简称“软件”）含有受到相关知识产权及其它法律保护之专有保密资料。您也了解并同意，经由本服务或广告商向您呈现之赞助广告或信息所包含之内容，亦受到著作权、商标权、服务商标、专利权或其它专属权利之法律保护。未经极客晨星少儿编程或广告商明示授权，您不得修改、出租、出借、出售、散布本服务或软件之任何部分或全部，或据以制作衍生著作，或使用擅自修改后的软件，包括但不限于为了未经授权而使用本服务之目的。极客晨星少儿编程仅授予您个人、不可移转及非专属之使用权，不得允许任何第三方复制、修改、创作衍生著作、进行还原工程、反向组译，或以其它方式发现原始码，或出售、转让、再授权或提供软件设定担保，或以其它方式移转软件之任何权利。您同意将通过由极客晨星少儿编程所提供的界面而非任何其它途径使用本服务。

        十八、无担保或保证
        您明确了解并同意∶
        18.1 本使用协议的任何规定不会免除极客晨星少儿编程因故意或重大过失造成您财产损失的任何责任；
        18.2 您使用本服务之风险由您个人负担。本服务系依“现状”及“现有”基础提供。极客晨星少儿编程对本服务不提供任何明示或默示的担保或保证，包含但不限于商业适售性、特定目的之适用性及未侵害他人权利等担保或保证；
        18.3 极客晨星少儿编程不保证以下事项∶
        18.3.1 本服务将符合您的要求；
        18.3.2 本服务将不受干扰、及时提供、安全可靠或不会出错；
        18.3.3 使用本服务取得之结果正确可靠；
        18.3.4 您经由本服务购买或取得之任何产品、服务、资讯或其它信息将符合您的期望；
        18.4 是否使用本服务下载或取得任何资料应由您自行考虑且自负风险，因任何资料之下载而导致的您电脑系统之任何损坏或数据流失等后果，由您自行承担；
        18.5 您自极客晨星少儿编程或经由本服务取得的任何建议或信息，无论是书面或口头形式，除非本使用协议有明确规定，将不构成本使用协议以外之任何保证。

        十九、免责声明
        19.1 您选择的第三方支付方式，在支付过程中因您自身原因或第三方支付平台原因造成的异常使其账户无法正常使用或遭受损失，极客晨星少儿编程对此概不负责，一切损失由您自行承担。
        19.2 非因极客晨星少儿编程的原因造成的异常状况下无法观看视频，或者无法登陆网站，极客晨星少儿编程对此状况免责，包括但不限于：
        19.2.1 因所在地区网络服务提供商引起的视频卡屏；
        19.2.2 因所在地区网络服务商提供服务受限，限制IP，导致不能访问网站；
        19.2.3 因您个人未能记住登陆账号或者密码，而要求退费或者其它行为的；
        19.2.4 因您更换服务商，或者电脑硬件问题引起的视频观看问题；
        19.2.5 因您所在地区的网络服务商或者其它代理商擅自更换您的网络服务而造成的意外问题；
        19.2.6 因您提出的高于协议要求或者网站正常要求而引起的服务问题。

        二十、责任限制
        您明确了解并同意，基于以下原因而造成的，包括但不限于利润、信誉、应用、数据损失或其它无形损失，极客晨星少儿编程不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿责任：
        20.1 本服务之使用或者因个人原因而无法使用；
        20.2 为替换或通过本服务购买或取得之任何商品、数据、信息、服务，收到的讯息，或缔结之交易而发生的成本；
        20.3 您的传输或数据遭到未获授权的存取或变造；
        20.4 任何第三方在本服务中所作之声明或行为；
        20.5 与本服务相关的其它事宜，但本使用协议有明确规定的除外；
        20.6 第三方以任何方式发布或投递欺诈性信息，或诱导用户受到经济损失，极客晨星少儿编程不承担任何责任。

        二十一、极客晨星少儿编程隐私保护政策
        您提供的登记资料及极客晨星少儿编程保留的有关您的若干其它资料将受到中国有关隐私的法律规范。

        二十二、赔偿
        由于您违反本协议、或您侵害极客晨星少儿编程的任何权利，您应当赔偿极客晨星少儿编程因此遭受的全部损失（包括合理的律师费、公证费等），包括直接损失、间接损失及可得利益的损失。
        由于您违反本协议，或侵害他人任何权利因而衍生或导致任何第三方提出任何索赔或请求，包括合理的律师费、公证费等，您应当自行解决并承担全部责任。此外，您同意赔偿极客晨星少儿编程及其关联企业、高级职员、代理人、品牌共有人或其它合作伙伴及员工，并使其免受损害。

        二十三、一般条款
        23.1 本协议构成您与极客晨星少儿编程之全部协议，并规范您对于本服务之使用行为。
        23.2 本协议及您与极客晨星少儿编程之关系，均受到中华人民共和国法律管辖。您与极客晨星少儿编程就本服务、本使用协议或其它有关事项发生的争议，应首先友好协商解决，协商不成时应提交北京市朝阳区人民法院诉讼解决。
        23.3 极客晨星少儿编程未行使或执行本使用协议任何权利或规定，不构成对前述权利或权利之放弃。
        23.4 本协议之标题仅供方便而设，不具任何法律或契约效果。

        二十四、通知和修订
        为给您提供更好的服务，我们可能对本协议不时地进行调整。我们会不定时通过我们的网址发出更新版本或以其他方式提醒您相关内容的更新，请您及时了解最新的协议。在前述情况下，若您继续使用我们的服务，即表示同意接受修改后的本协议并受之约束。


        北京极客晨星科技发展有限公司
                    </pre>
                </div>
            </div>
      </div>
      <footer id="footer">
            <div class="footer_left">
                <img src="@/assets/images/robot.png" alt="">
            </div>
            <div class="footer_center">
                <p>￥<span>1</span></p>
                <p><label>已优惠￥398</label><a>原价399元</a></p>
            </div>
            <div class="footer_right">
                <button @click="immediatePay()">立即支付</button>
            </div>
      </footer>
  </div>

</template>
<script>
import axios from 'axios';
import { setInterval, clearInterval } from 'timers';
export default {
    data() {
        return {
            title: "", // 课程名称
            total: 100, // 总名额数
            showprotocol: false, // 购课协议
            num: "", // 剩余名额
            date: "10:00", // 倒计时默认时间
            prompt: "", // 验证提示
            checkbox: true, // 勾选协议
            text: "获取验证码",
            showgift: true, // 是否显示活动礼品
            form: {
                childName: "", // 孩子姓名
                phone: "", // 手机号
                yzm: "", // 验证码
                paytype: "wechatpay", // 支付类型  微信 or 支付宝
                classtype: "", // 课程类型
                utm_source: "",
                successUrl: "https://store.jikestar.com/salesactivity/2021Jan-1/index.html#/success"
            },
            VerificationCode: '', // 验证码
            timers: null, 
            oldDate: "", // 一进入页面拿到的时间
            nowDate: "", // 当前时间
            maxtime: 600 // 支付剩余时长
        }
    },
    mounted(){
        this.oldDate = new Date().getTime();
        this.form.classtype = this.$route.query.classtype; // 课程类型
        this.title = this.$route.query.title; // 课程名称
        // this.sharePyqmessage(); // 微信分享
        this.getActiveinfo();
        this.timers = setInterval(()=>{
            this.endTimecount()
        },1000);
        if(window.location.search){
            this.form.utm_source = window.location.search.split('?')[1].split('=')[1]
        }else{
            this.form.utm_source = '';
        }
    },
    methods:{
        // 打开协议
        openProtocol(){
            this.showprotocol = true;
        },
        close(){
            this.showprotocol = false;
        },
        // 获取活动信息
        getActiveinfo(){
            this.$axios({
                url: "https://pay.geek-8.com/v2/agent/2021Jan",
                method: "GET"
            }).then((data)=>{
                console.log(data);
                if(data.data.result == "success"){
                    data.data.nbOrders == 0? this.showgift = false : this.showgift = true; // 还剩余多少个名额
                    this.num = data.data.nbOrders;
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 倒计时
        endTimecount(){
            var minutes="",seconds="";
            if(this.maxtime >0){
                minutes = Math.floor(this.maxtime / 60) < 10 ? '0'+Math.floor(this.maxtime / 60): Math.floor(this.maxtime / 60);
                seconds = Math.floor(this.maxtime % 60) < 10 ? '0'+Math.floor(this.maxtime % 60): Math.floor(this.maxtime % 60);
                this.date = minutes + ":" + seconds;
                --this.maxtime;
            }else{
                clearInterval(this.timers);
                this.date = "00:00"
            }
        },
        // 获取验证码
        requestVerificationCode(){
            if(this.text !== "获取验证码"){
                return;
            }
            if(this.form.phone == ""){
                this.prompt = "请输入手机号";
                return;
            }
            var myreg=/^[1][2,3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.form.phone)) {
                this.prompt = "手机号输入错误";
                return;
            }
            let timer = null;
            this.prompt = "";
            this.$axios({
                url: 'https://mooc.jikestar.com/verifycode',
                method: 'POST',
                data: {
                    phone: this.form.phone
                }
            }).then((data)=>{
                this.VerificationCode = data.data.code;
                let time = 60;
                this.text = "发送成功(60s)";
                clearInterval(timer);
                timer = setInterval(() => {
                    time--;
                    if(time < 0){
                        this.text = "获取验证码";
                        clearInterval(timer);
                    }else{  
                        this.text = `发送成功(${(time)}s)`;
                    }
                }, 1000);
            }).catch((error)=>{
                this.prompt = "获取验证码失败";
            })
        },
        // 立即支付
        immediatePay(){
            this.submitHandler();
        },
        submitHandler(){
            console.log(this.form.classtype)
            if(this.form.childName == "" || this.form.phone == "" || this.form.yzm == ""){
                this.prompt = "每一项都需要填写哦";
                return;
            }
            var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(this.form.phone)) {
                this.prompt = "手机号输入错误";
                return;
            }
            if(this.VerificationCode !== this.form.yzm){
                this.prompt = "验证码输入有误";
                return;
            }
            if(!this.checkbox){
                this.prompt = "请同意勾选购课协议";
                return;
            }
            // 判断支付时间是否再10分钟内
            this.nowDate = new Date().getTime();
            if(parseInt(this.nowDate - this.oldDate) > 10*60*1000){
                this.$router.push({path:"/timeout"});
                return;
            }
            this.prompt = "";
            this.$refs.form.submit();
        },
        // 微信分享
        sharePyqmessage(){
            var urlShared = window.location.href.replace('login','');
            var urlEncoded = encodeURIComponent(window.location.href);
            var urlRequest = 'https://mars.geek-8.com/jssdkparams?userurl=' + urlEncoded;
            console.log('urlShared ' + urlShared);

            var xhr = new XMLHttpRequest();
            xhr.open('GET', urlRequest, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                var json = JSON.parse(xhr.response);
                var urlImg, title,wxdesc;
                urlImg = 'https://cdn2.geek-8.com/geekmooc/media/upload_03ab60358252ed9086db64989b5af894.png'; // 转发图标
                title = '极客晨星少儿编程1元秒杀'; // 转发标题
                wxdesc = '1元买价值399元少儿编程课，趣味少儿编程，适合4-16岁孩子。秒杀前100名送文具大礼盒。' // 转发描述

                wx.config({
                    debug: false,
                    appId: json.appId,
                    timestamp: json.timestamp,
                    nonceStr: json.nonceStr,
                    signature: json.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });

                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: title + ':' + wxdesc,
                        link: urlShared,
                        imgUrl: urlImg,
                        success: function () {
                            console.log('分享成功'); 
                        },
                        cancel: function () {
                            console.log('分享失败');
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: wxdesc,
                        link: urlShared,
                        imgUrl: urlImg,
                        type: '',
                        dataUrl: '',
                        success: function () {
                            console.log('分享成功');
                        },
                        cancel: function () { 
                            console.log('分享失败');
                        }
                    });
                });
                }
            };
            xhr.send(null);
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/login.scss';
</style>