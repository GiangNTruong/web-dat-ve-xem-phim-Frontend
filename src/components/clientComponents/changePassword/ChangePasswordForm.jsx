import React from "react";

export default function ChangePasswordForm({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        id="radix-:r6:"
        aria-describedby="radix-:r8:"
        aria-labelledby="radix-:r7:"
        data-state="open"
        className="bg-black fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl md:w-full"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="radix-:r7:"
            className="text-white text-2xl font-bold leading-none tracking-tight"
          >
            Đổi mật khẩu
          </h2>
          <p id="radix-:r8:" className="text-sm text-muted-foreground" />
        </div>
        <div className="overflow-auto">
          <div>
            <div className="space-y-4">
              <form autoComplete="off">
                <div className="mt-5">
                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":r11:-form-item"
                    >
                      Mật khẩu mới
                    </label>
                    <input
                      className="flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Mật khẩu mới"
                      autoComplete="new-password"
                      id=":r11:-form-item"
                      aria-describedby=":r11:-form-item-description"
                      aria-invalid="false"
                      type="password"
                      defaultValue=""
                      name="NewPassword"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":r12:-form-item"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      className="flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Xác nhận mật khẩu mới"
                      autoComplete="new-password"
                      id=":r12:-form-item"
                      aria-describedby=":r12:-form-item-description"
                      aria-invalid="false"
                      type="password"
                      defaultValue=""
                      name="ConfirmNewPassword"
                    />
                  </div>
                </div>
                <div className="mt-8 w-full">
                  <button
                    className="bg-red-300 inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-danger text-destructive-foreground hover:bg-blue-500 h-10 px-8 py-2 w-full"
                    type="submit"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="text-white sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
