export interface AndroidInterface {
  showToast: (message: string) => void;
  openCamera: (index: number) => void;
  openGallery: () => void;
}

export interface KakaoInterface {
  kakaoLogin: () => void;
}
