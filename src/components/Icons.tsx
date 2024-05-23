import { LucideProps, Plus } from "lucide-react";

export const Icons = {
  flag: (props: LucideProps) => (
    <svg
      {...props}
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0909 6.75L12.7159 4.5H6.75V2.25H4.5V24.75H6.75V15.75H12.0341L15.4091 18H22.5V6.75H16.0909Z"
        fill="#FBF2E3"
      />
    </svg>
  ),
  compass: (props: LucideProps) => (
    <svg
      {...props}
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5002 2.5835C8.37791 2.5835 2.5835 8.37791 2.5835 15.5002C2.5835 22.6224 8.37791 28.4168 15.5002 28.4168C22.6224 28.4168 28.4168 22.6224 28.4168 15.5002C28.4168 8.37791 22.6224 2.5835 15.5002 2.5835ZM19.3752 19.3752L9.04183 21.9585L11.6252 11.6252L21.9585 9.04183L19.3752 19.3752Z"
        fill="#2C1300"
      />
      <path
        d="M15.4998 18.0832C16.9266 18.0832 18.0832 16.9266 18.0832 15.4998C18.0832 14.0731 16.9266 12.9165 15.4998 12.9165C14.0731 12.9165 12.9165 14.0731 12.9165 15.4998C12.9165 16.9266 14.0731 18.0832 15.4998 18.0832Z"
        fill="#2C1300"
      />
    </svg>
  ),
  agenda: (props: LucideProps) => (
    <svg
      {...props}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_121_830)">
        <path
          d="M23.5002 1.85596H21.0452V5.35596C21.0516 5.62178 21.0052 5.88623 20.9089 6.13406C20.8125 6.38188 20.668 6.60817 20.4838 6.79987C20.2995 6.99157 20.0791 7.14488 19.8353 7.25097C19.5915 7.35705 19.3291 7.41381 19.0632 7.41796H18.4382C18.1723 7.41394 17.9098 7.35728 17.6659 7.25124C17.4221 7.1452 17.2016 6.99189 17.0173 6.80016C16.833 6.60843 16.6886 6.38209 16.5922 6.1342C16.4959 5.88632 16.4497 5.62181 16.4562 5.35596V1.85596H8.93619V5.35596C8.94082 5.62282 8.89271 5.88797 8.79461 6.13619C8.6965 6.38441 8.55034 6.61081 8.36451 6.80239C8.17869 6.99398 7.95685 7.14699 7.71174 7.25262C7.46663 7.35826 7.20307 7.41444 6.93619 7.41796H6.31119C5.77223 7.40979 5.25835 7.18885 4.88163 6.80333C4.50491 6.4178 4.29591 5.89897 4.3002 5.35996V1.85996H1.50019C1.09374 1.87328 0.70877 2.04571 0.428211 2.34011C0.147651 2.63452 -0.00605489 3.02733 0.000194104 3.43396V23.441C-0.00624709 23.8462 0.147846 24.2376 0.428859 24.5296C0.709872 24.8217 1.09499 24.9908 1.50019 25H23.5002C23.9054 24.9908 24.2905 24.8217 24.5715 24.5296C24.8525 24.2376 25.0066 23.8462 25.0002 23.441V3.43396C25.0075 3.02664 24.8543 2.63281 24.5736 2.33754C24.2929 2.04227 23.9074 1.86929 23.5002 1.85596ZM7.81219 20.911C7.81219 21.0632 7.75172 21.2092 7.64408 21.3168C7.53643 21.4245 7.39043 21.485 7.23819 21.485H3.99219C3.83996 21.485 3.69396 21.4245 3.58631 21.3168C3.47867 21.2092 3.41819 21.0632 3.41819 20.911V18.348C3.41819 18.1957 3.47867 18.0497 3.58631 17.9421C3.69396 17.8344 3.83996 17.774 3.99219 17.774H7.23919C7.39143 17.774 7.53743 17.8344 7.64508 17.9421C7.75272 18.0497 7.8132 18.1957 7.8132 18.348L7.81219 20.911ZM7.81219 14.711C7.81219 14.8632 7.75172 15.0092 7.64408 15.1168C7.53643 15.2245 7.39043 15.285 7.23819 15.285H3.99219C3.83996 15.285 3.69396 15.2245 3.58631 15.1168C3.47867 15.0092 3.41819 14.8632 3.41819 14.711V12.146C3.41819 11.9937 3.47867 11.8477 3.58631 11.7401C3.69396 11.6324 3.83996 11.572 3.99219 11.572H7.23919C7.39143 11.572 7.53743 11.6324 7.64508 11.7401C7.75272 11.8477 7.8132 11.9937 7.8132 12.146L7.81219 14.711ZM14.6972 20.911C14.6972 21.0632 14.6367 21.2092 14.5291 21.3168C14.4214 21.4245 14.2754 21.485 14.1232 21.485H10.8762C10.724 21.485 10.578 21.4245 10.4703 21.3168C10.3627 21.2092 10.3022 21.0632 10.3022 20.911V18.348C10.3022 18.1957 10.3627 18.0497 10.4703 17.9421C10.578 17.8344 10.724 17.774 10.8762 17.774H14.1232C14.2754 17.774 14.4214 17.8344 14.5291 17.9421C14.6367 18.0497 14.6972 18.1957 14.6972 18.348V20.911ZM14.6972 14.711C14.6972 14.8632 14.6367 15.0092 14.5291 15.1168C14.4214 15.2245 14.2754 15.285 14.1232 15.285H10.8762C10.724 15.285 10.578 15.2245 10.4703 15.1168C10.3627 15.0092 10.3022 14.8632 10.3022 14.711V12.146C10.3022 11.9937 10.3627 11.8477 10.4703 11.7401C10.578 11.6324 10.724 11.572 10.8762 11.572H14.1232C14.2754 11.572 14.4214 11.6324 14.5291 11.7401C14.6367 11.8477 14.6972 11.9937 14.6972 12.146V14.711ZM21.7282 20.911C21.7282 21.0632 21.6677 21.2092 21.5601 21.3168C21.4524 21.4245 21.3064 21.485 21.1542 21.485H17.9082C17.756 21.485 17.61 21.4245 17.5023 21.3168C17.3947 21.2092 17.3342 21.0632 17.3342 20.911V18.348C17.3342 18.1957 17.3947 18.0497 17.5023 17.9421C17.61 17.8344 17.756 17.774 17.9082 17.774H21.1552C21.3074 17.774 21.4534 17.8344 21.5611 17.9421C21.6687 18.0497 21.7292 18.1957 21.7292 18.348L21.7282 20.911ZM21.7282 14.711C21.7282 14.8632 21.6677 15.0092 21.5601 15.1168C21.4524 15.2245 21.3064 15.285 21.1542 15.285H17.9082C17.756 15.285 17.61 15.2245 17.5023 15.1168C17.3947 15.0092 17.3342 14.8632 17.3342 14.711V12.146C17.3342 11.9937 17.3947 11.8477 17.5023 11.7401C17.61 11.6324 17.756 11.572 17.9082 11.572H21.1552C21.3074 11.572 21.4534 11.6324 21.5611 11.7401C21.6687 11.8477 21.7292 11.9937 21.7292 12.146L21.7282 14.711Z"
          fill="#FBF2E3"
        />
        <path
          d="M6.93736 6.54295C7.2424 6.53328 7.53125 6.40337 7.74088 6.18156C7.95051 5.95976 8.06391 5.66405 8.05637 5.35895V1.16895C8.06253 0.865867 7.94815 0.572726 7.73834 0.353915C7.52853 0.135104 7.24044 0.00851516 6.93736 0.00195312L6.31236 0.00195313C6.00707 0.00773742 5.71639 0.133768 5.5035 0.352659C5.2906 0.57155 5.17268 0.865614 5.17537 1.17095V5.36095C5.17184 5.66787 5.28905 5.96387 5.50174 6.18517C5.71443 6.40646 6.00555 6.53532 6.31236 6.54395L6.93736 6.54295Z"
          fill="#FBF2E3"
        />
        <path
          d="M19.0632 6.54293C19.366 6.53173 19.652 6.40071 19.8583 6.17868C20.0646 5.95665 20.1742 5.66179 20.1631 5.35893V1.16893C20.1678 1.02006 20.143 0.871735 20.0902 0.73247C20.0374 0.593206 19.9576 0.465745 19.8554 0.357405C19.7532 0.249064 19.6306 0.161979 19.4946 0.101148C19.3587 0.0403174 19.2121 0.0069391 19.0632 0.00292969L18.4382 0.00292969C18.289 0.00693321 18.1421 0.0404085 18.006 0.101427C17.8698 0.162446 17.7471 0.249802 17.6448 0.358463C17.5426 0.467124 17.4629 0.594942 17.4102 0.734554C17.3576 0.874166 17.3331 1.02281 17.3382 1.17193V5.36193C17.3271 5.66479 17.4367 5.95965 17.643 6.18168C17.8493 6.40371 18.1353 6.53473 18.4382 6.54593L19.0632 6.54293Z"
          fill="#FBF2E3"
        />
      </g>
      <defs>
        <clipPath id="clip0_121_830">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  mapPin: (props: LucideProps) => (
    <svg
      {...props}
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00001 0.333332C3.05935 0.333332 0.66668 2.726 0.66668 5.66333C0.647347 9.96 5.79735 13.5227 6.00001 13.6667C6.00001 13.6667 11.3527 9.96 11.3333 5.66667C11.3333 2.726 8.94068 0.333332 6.00001 0.333332ZM6.00001 8.33333C4.52668 8.33333 3.33335 7.14 3.33335 5.66667C3.33335 4.19333 4.52668 3 6.00001 3C7.47335 3 8.66668 4.19333 8.66668 5.66667C8.66668 7.14 7.47335 8.33333 6.00001 8.33333Z"
        fill="black"
      />
    </svg>
  ),
  plus: (props: LucideProps) => <Plus {...props} />,
};
