import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="求职汪" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <ul className="flex space-x-4">
              <li>
                <Link to="resume-service" className="text-white">
                  简历修改服务
                </Link>
              </li>
              <li>
                <Link to="interview-service" className="text-white">
                  面试模拟服务
                </Link>
              </li>
              <li>
                <a href="#about-us" className="text-white">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#contact-us" className="text-white">
                  联系我们
                </a>
              </li>
              <li>
                <Link to="register-login" className="text-white">
                  登录/注册
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:hidden flex items-center">
            <button className="text-white">
              <i className="fa fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
      <section className="hero flex-grow">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">追寻你的职场梦想！</h1>
          <p>
            求职汪是你忠实的求职伙伴，我们运用当下最先进的AI技术，提供简历修改润色和面试模拟服务，为你解决求职难和面试慌，助你实现职业目标。
          </p>
        </div>
      </section>
      <section className="resume-editing bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">简历润色</h2>
          <p className="mb-6">
            上传你的简历，我们会提供超有范儿的建议，让你的简历瞬间升级，吸引招聘经理的注意！
          </p>
          <Link to="/resume-service" className="bg-blue-500 text-white px-4 py-2 rounded">
            快来试试
          </Link>
        </div>
      </section>
      <section className="interview-simulation py-20">
        <div className="container mx-auto        px-4">
          <h2 className="text-3xl font-bold mb-4">面试模拟</h2>
          <p className="mb-6">
            通过我们的面试模拟，你可以获得丰富的面试经验，锻炼自己的应变能力和沟通技巧，变得更加自信、从容、出色！
          </p>
          <Link to="/interview-service" className="bg-blue-500 text-white px-4 py-2 rounded">
            快来试试
          </Link>
        </div>
      </section>
      <section className="about-us bg-gray-100 py-20" id="about-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">关于我们</h2>
          <p>
            求职汪是一支充满朝气和活力的年轻团队，我们的使命是帮助求职者解决求职难和面试慌的问题，用AI赋能，为职场打call！
            我们承诺不会侵犯用户的个人隐私。用户上传的简历只会保留在本地，求职汪无权查看。
            祝大家都求职顺利，offer多多！
          </p>
        </div>
      </section>
      <section className="contact-us py-20" id="contact-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">联系我们</h2>
          <p>
            有任何问题或建议吗？快来发邮件给我们吧，我们会在72小时内回复你！
          </p>
        </div>
      </section>
      <footer className="bg-blue-500 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-white">&copy; 2023 Jobsdog. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Terms of Use
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;

