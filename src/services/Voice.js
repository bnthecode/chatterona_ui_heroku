class Voice {
  conf = {
    sdpSemantics: "unified-plan", //newer implementation of WebRTC
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    iceCandidatePoolSize: 2,
  };
  channelId = "";
  connection = "";
  userConnection = new RTCPeerConnection(this.conf);

  establishPeer = async (channelId, connection, stream) => {
    try {
      this.channelId = channelId;
      this.connection = connection;

      const mine = new RTCPeerConnection(this.conf);
      const offer = await mine.createOffer();

      await mine.setLocalDescription(offer);

      const tracks = stream.getTracks();

      tracks.map((track) => mine.addTrack(track));
      mine.ontrack = this.onTrack;

      mine.onIceCandidate = (e) => mine.addIceCandidate(e.candidate);

      
      connection.send(
        JSON.stringify({
          type: "create-offer",
          offer: offer,
          channelId: channelId,
        })
      );
    } catch (err) {
 
    }
  };

  createRemotePeer = async (channelId, offer, connection) => {
    const theirs = new RTCPeerConnection(this.conf);

    await theirs.setRemoteDescription(offer);

    const answer = await theirs.createAnswer();
    await theirs.setLocalDescription(answer);

    theirs.onicecandidate = (e) => theirs.addIceCandidate(e.candidate);
    theirs.ontrack = (e) => {

    };

    connection.send(
      JSON.stringify({
        type: "create-answer",
        channelId: channelId,
        answer: answer,
      })
    );
  };

  setRemoteAnswer = async (answer) => {
    await this.userConnection.setRemoteDescription(answer);
  };

  onIceCandidate = (event) => {

    if (event.candidate) {
      this.connection.send(
        JSON.stringify({
          type: "candidate",
          candidate: event.candidate,
          channelId: this.channelId,
        })
      );
    }
  };

  onTrack = (event) => {

  };
}

export default Voice;

// var pc1, pc2, offer, answer;

// pc1 = new RTCPeerConnection();
// pc2 = new RTCPeerConnection();

// pc1.oniceconnectionstatechange = function(candidate) {
//   alert('on ice cand')
//   pc2.addIceCandidate(candidate);
// };

// pc2.onicecandidate = function(candidate) {
//   alert('on ice cand')
//   pc1.addIceCandidate(candidate);
// };

// pc1.createOffer(onOfferCreated, onError);
// alert('create offer')
// function onError(err) {
//   window.alert(err.message);
// }

// function onOfferCreated(description) {
//   alert('on offer created')
//   offer = description;
//   pc1.setLocalDescription(offer, onPc1LocalDescriptionSet, onError);
// }

// function onPc1LocalDescriptionSet() {
//   alert('on local description set')
//   // after this function returns, pc1 will start firing icecandidate events
//   pc2.setRemoteDescription(offer, onPc2RemoteDescriptionSet, onError);
// }

// function onPc2RemoteDescriptionSet() {
//   pc2.createAnswer(onAnswerCreated, onError);
// }

// function onAnswerCreated(description) {
//   alert('on answer created')
//   answer = description;
//   pc2.setLocalDescription(answer, onPc2LocalDescriptionSet, onError);
// }

// function onPc2LocalDescriptionSet() {

//   // after this function returns, you'll start getting icecandidate events on pc2
//   pc1.setRemoteDescription(answer, onPc1RemoteDescriptionSet, onError);
// }

// function onPc1RemoteDescriptionSet() {
//   window.alert('Yay, we finished signaling offers and answers');
// }
