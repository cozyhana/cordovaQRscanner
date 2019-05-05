/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        var _this = this;
        var oScanBox = document.getElementById('scanBox');
        var oScanBtn = document.getElementById('scanBtn');
        var oScanCtn = document.getElementById('scanCtn');
        var oBody = document.querySelector('body')
        var oBackBtn = document.querySelector('#backBtn')
        oScanBtn.onclick = function () {
            oScanBox.style.display = 'none';
            oScanCtn.style.display = 'block'
            oBody.style.background = 'transparent'
            _this.scan()
        }
        oBackBtn.onclick = function () {
            oScanBox.style.display = 'block';
            oScanCtn.style.display = 'none'
            oBody.style.background = '#fff'
        }
    },
    scan: function () {
        if (typeof (QRScanner) != 'undefined') {
            //初始化检测，申请摄像头等权限
            QRScanner.prepare(onDone); // show the prompt
        } else {
            alert('插件加载失败');
        }
        function onDone(err, status) {
            if (err) {
                console.error(err);
            }
            if (status.authorized) {
                //绑定扫描监听
                // `QRScanner.cancelScan()` is called.
                QRScanner.scan(function (err, text) {
                    if (err) {
                        // an error occurred, or the scan was canceled (error code `6`)
                        alert('启动扫描出错：' + JSON.stringify(err));
                    } else {
                        // The scan completed, display the contents of the QR code:
                        QRScanner.destroy(function (status) {
                            var oScanBox = document.getElementById('scanBox');
                            var oScanCtn = document.getElementById('scanCtn');
                            var oScanHtml = document.getElementById('scanHtml')
                            oScanHtml.innerHTML = text
                            oScanBox.style.display = "block";
                            oScanBox.style.background = "#fff";
                            oScanCtn.style.display = "none";
                        })
                    }
                });

                //开始扫描，需要将页面的背景设置成透明
                QRScanner.show();

            } else if (status.denied) {
                // The video preview will remain black, and scanning is disabled. We can
                // try to ask the user to change their mind, but we'll have to send them
                // to their device settings with `QRScanner.openSettings()`.
                alert('用户拒绝访问摄像头');
            } else {
                // we didn't get permission, but we didn't get permanently denied. (On
                // Android, a denial isn't permanent unless the user checks the "Don't
                // ask again" box.) We can ask again at the next relevant opportunity.
            }
        }

        // QRScanner.show(function (status) {
        //     console.log(status);
        //     QRScanner.prepare(function (err, status) {
        //         if (err) {
        //             console.error(err._message);
        //         } else {
        //             QRScanner.scan(function (err, contents) {
        //                 if (err) {
        //                     console.error(err._message);
        //                 }
        //                 let oText = document.getElementById('text')
        //                 oText.innerHTML = contents
        //                 QRScanner.hide(function (status) {
        //                     alert(status);
        //                 })
        //             });
        //         }
        //     });
        // });
    }
};

app.initialize();