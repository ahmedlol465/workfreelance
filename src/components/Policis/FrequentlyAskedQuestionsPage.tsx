import { Link } from "react-router-dom";

const FrequentlyAskedQuestionsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-32">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Frequently asked questions:
          </h2>
          <Link to="/react">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Freelancer Related Questions
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold">Why use the two tax percentages?</h4>
            <p className="mb-2">
              Freelancers pay a 5% Worklink platform commission & 2% Saudi tax
              percentage. The 5% commission is taken from the freelancer’s
              earnings, while the 2% tax is collected by Worklink to comply with
              Saudi tax regulations. For example, if a project is for $100,
              freelancer receive $93 after platform & tax deductions.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              Neighbors in my profile are other users? But I haven't approved
              yet why?
            </h4>
            <p className="mb-2">
              Yes, neighbors in profile are other users. You will be neighbor to
              anyone who visits your profile in Worklink platform. You will get
              notification when someone visit your profile. You can remove
              neighbor at any time you want.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              How can I know that project is reasonable to me to apply for
              project?
            </h4>
            <p className="mb-2">
              You can check project description in reasonable time to apply for
              project.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              I'm a freelancer and I would like to work direct client because
              some of their work listed project project and project project
              because they are not project.
            </h4>
            <p className="mb-2">
              Worklink platform is to connect freelancers and clients to work
              together, if you want to work directly with client, you can find
              clients outside the platform.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              What is a short time and budget to apply “Urgent Request”?
            </h4>
            <p className="mb-2">
              Yes, the project (Urgent Request) is urgent for client to get
              project done in shorter time.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              What is a reasonable time to apply “Fast Project”?
            </h4>
            <p className="mb-2">
              Yes, the project (Fast Project) is faster than regular project.
              Because you will get paid in shorter time. You will get paid in 3
              days after client approve your project submission. For regular
              project, you will get paid in 7 days after client approve your
              project submission.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              I got suspended from project after client coding?
            </h4>
            <p className="mb-2">
              Yes, Worklink platform is strict to rules & policy, if you violate
              policy, you will get ban from applying project.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              Can I change the skills stated in my project to create an identity
              as online employee?
            </h4>
            <p className="mb-2">
              Freelancers are not allowed to change skills in project to create
              an identity as online employee.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              What is the reasonable budget to state as a professional price?
            </h4>
            <p className="mb-4">
              Freelancers are not allowed to state reasonable budget to state as
              a professional price.
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Client Related Questions
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold">
              I'm a client looking for freelancer to perform my project, how can
              I know if freelancer is qualified?
            </h4>
            <p className="mb-2">
              Client can check freelancer profile, portfolio, reviews, rating,
              skills, and experience before hiring freelancer. Client can also
              check freelancer profile and project history to know if freelancer
              is qualified for project. Client can also check freelancer profile
              and project history to know if freelancer is qualified for
              project.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              How can I pay freelancer securely?
            </h4>
            <p className="mb-2">
              Client can pay freelancer securely through Worklink platform.
              Worklink platform is secure and safe to pay freelancer. Worklink
              platform is using secure payment gateway to process payment.
              Worklink platform is using SSL certificate to secure payment
              information. Worklink platform is using PCI DSS compliant payment
              gateway to process payment. Worklink platform is using 3D Secure
              payment gateway to process payment.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              I'm a client and I would like to work direct freelancer because
              some of their work listed project project and project project
              because they are not project.
            </h4>
            <p className="mb-2">
              Worklink platform is to connect freelancers and clients to work
              together, if you want to work directly with freelancer, you can
              find freelancers outside the platform.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              How many times can I edit project?
            </h4>
            <p className="mb-4">
              Yes, you can edit project as many times as you want. But, you can
              not edit project after freelancer apply for project. You can edit
              project before freelancer apply for project. You can edit project
              after freelancer apply for project, but you need to cancel project
              and create new project.
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Becoming User Suspension
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold">
              What is the reason for Worklink account suspension?
            </h4>
            <ul className="list-disc ml-6 mb-2">
              <li>
                Violation of Worklink terms and policy. If you violate Worklink
                terms and policy, your account will be suspended.
              </li>
              <li>
                Spamming, fraud, scamming, phishing, or any other illegal
                activities. If you are doing spamming, fraud, scamming,
                phishing, or any other illegal activities, your account will be
                suspended.
              </li>
              <li>
                Creating multiple accounts. If you are creating multiple
                accounts, your account will be suspended.
              </li>
              <li>
                Using Worklink platform for illegal activities. If you are using
                Worklink platform for illegal activities, your account will be
                suspended.
              </li>
              <li>
                Using Worklink platform for spamming, fraud, scamming, phishing,
                or any other illegal activities. If you are using Worklink
                platform for spamming, fraud, scamming, phishing, or any other
                illegal activities, your account will be suspended.
              </li>
              <li>
                Using Worklink platform for any other illegal activities. If you
                are using Worklink platform for any other illegal activities,
                your account will be suspended.
              </li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Receiving Text Suspension
          </h3>
          <div className="mb-4">
            <h4 className="font-semibold">
              Why cant I get text to change my password in the Worklink
              platform?
            </h4>
            <p className="mb-2">
              Yes, you can not get text to change your password in the Worklink
              platform. You need to contact Worklink support team to change your
              password.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">
              How can we know that project is property right for project owner?
            </h4>
            <p className="mb-4">
              Yes, project owner property right is guaranteed for project owner.
              Worklink platform is not responsible for project owner property
              right. Project owner is responsible for project owner property
              right. Worklink platform is not responsible for project owner
              project property right. Worklink platform is not responsible for
              project owner project property right violation. Worklink platform
              is not responsible for project owner project property right
              infringement. Worklink platform is not responsible for project
              owner project property right misappropriation. Worklink platform
              is not responsible for project owner project property right theft.
              Worklink platform is not responsible for project owner project
              property right piracy. Worklink platform is not responsible for
              project owner project property right plagiarism.
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Becoming User Suspension
          </h3>
          <div className="mb-4">
            <h4 className="font-semibold">Receiving Text Suspension</h4>
            <p className="mb-4">
              Worklink accounts are reviewed on a weekly basis. In the event
              that your account is flagged for a violation of Worklink’s policy
              (particularly in the copying of other users’ content), it will be
              suspended. If you believe your account was suspended in error,
              please contact Worklink support center to submit an appeal. After
              reviewing the appeal and the account details, a final decision
              will be issued.
            </p>
          </div>

          <p className="mt-8">
            This policy is subject to constant change and development. We
            encourage users to review it periodically and to contact us through
            the help center for any inquiries regarding its terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestionsPage;
