export interface AndroidInterface {
  showToast: (message: string) => void;
  openCamera: (index: number) => void;
}

export interface KakaoInterface {
  kakaoLogin: () => void;
}
