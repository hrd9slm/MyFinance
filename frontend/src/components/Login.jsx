import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/Auth.module.css';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
      <div className="parentContainer">
        <div className="container">
          <div className="logiform-container py-4">
            <div className="flex-container d-flex flex-wrap justify-content-center bg-light p-0">
              <div className="column d-block p-3 p-md-4 p-lg-5 getstarted-col">
                <div className="d-flex gap-4 content p-3 px-md-4 py-md-5 px-lg-5 child-w-100 flex-wrap position-relative h-100 align-items-center">
                  <div className="back-arrow position-relative">
                    <button className="btn btn-semitransparent rounded-pill py-0 px-4 py-lg-2 px-lg-5">
                      <i className="fa-solid fa-arrow-right-long text-white"></i>
                    </button>
                  </div>
                  <div className="text-content position-relative">
                    <span className="text-secondary2">Hi Welcome Again </span>
                    <h2 className="text-white">Let&lsquo;s Get Started</h2>
                    <p className="text-secondary2 mt-4">
                      Login to your account and get access to all features. We
                      invite you to join us and get better experience.
                    </p>
                  </div>
                  <div className="content-icon position-relative">
                    <img
                      src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png"
                      alt=""
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="column d-block p-3 d-flex align-items-center justify-content-center h-100">
                <div className="content">
                  <div className="form-wrapper py-4">
                    <h2 className="mb-4">Sign In</h2>
                    <form onSubmit={onSubmit}>
                      <div className="form-input mb-3 p-0">
                        <label htmlFor="yourEmail" className="text-secondary">
                          Your Email
                        </label>
                        <div className="input-relative position-relative mt-1 mt-lg-2">
                          <input
                            type="email"
                            className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                            name="email"
                            id="yourEmail"
                            maxLength="40"
                            value={email}
                            onChange={onChange}
                            required
                          />
                          <div className="nameinput-icon-feedback icon-feedback">
                            <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                            <i className="fa-solid fa-circle-check text-success icon"></i>
                          </div>
                        </div>
                        <small className="email-error-feedback error-feedback text-danger text-small"></small>
                      </div>
                      <div className="form-input mb-3 p-0">
                        <label htmlFor="yourPassword" className="text-secondary">
                          Your Password
                        </label>
                        <div className="input-relative position-relative mt-1 mt-lg-2">
                          <input
                            type="password"
                            className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                            name="password"
                            id="yourPassword"
                            maxLength="40"
                            value={password}
                            onChange={onChange}
                            required
                          />
                          <div className="nameinput-icon-feedback icon-feedback">
                            <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                            <i className="fa-solid fa-circle-check text-success icon"></i>
                          </div>
                          <div id="showPassword" className="show-password">
                            <i className="fa-solid fa-eye icon"></i>
                            <i className="fa-solid fa-eye-slash icon"></i>
                          </div>
                        </div>
                        <small>
                          <a href="#" className="show-password"></a>
                        </small>
                        <small className="pw-error-feedback error-feedback text-danger text-small"></small>
                      </div>
                      <div className="form-submit">
                        <button
                          id="btnCreateAccount"
                          type="submit"
                          className="btn btn-success w-100 rounded-pill py-lg-2 mt-1 mt-lg-2"
                        >
                          login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="have-account-option text-center mt-2">
                    <p>
                      Don&apos;t have an account?{" "}
                      <a href="/register" className="text-success">
                        Create Account
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;