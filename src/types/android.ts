export interface AndroidInterface {
  showToast: (message: string) => void;
  openCamera: () => void;
}

export interface KakaoInterface {
  kakaoLogin: () => void;
}
