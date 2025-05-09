const ServicesPolicyPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-32">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8 font-sans text-gray-700 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Services policy</h2>
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
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            1. Read the Service Details Carefully and Pay Attention to the
            Delivery Time
          </h3>
          <div className="mb-4">
            <h4 className="font-semibold">
              Service Description (Project Owner):
            </h4>
            <ul className="list-disc ml-6">
              <li>
                What is included in the service title and description is exactly
                what you will receive so ensure you read it carefully and take
                note of the delivery time. Please note that services are only
                auto-closed for 75 days after you approve the delivery,
                regardless of the service function.
              </li>
            </ul>
          </div>
          <p className="mb-2">
            Communications with the freelancer before ordering an offer is
            purchasing the service and clarify your request.
          </p>
          <p className="mb-4">
            If there are unclear details in the service or you have any
            questions, you can contact the freelancer before starting the
            service. Be sure to clearly explain your request, ensuring the
            agreement between you to complete and clear to avoid any
            misunderstandings later on.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            2. Review the Service Carefully Before Accepting It.
          </h3>
          <p className="mb-4">
            If the freelancer sends you a delivery request, review the service
            carefully and ensure it matches the description and your agreement
            with the freelancer. Once you confirm the delivery, the freelancer
            will receive the payment, which means you have fully received the
            service.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            3. Request Service Modifications.
          </h3>
          <p className="mb-4">
            If there are any errors or shortcomings in the freelancer's work,
            contact them using the "Contact me" button and explain the
            modifications needed.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            4. Refund Your Money If You Don't Get a Response From the Seller.
          </h3>
          <p className="mb-4">
            If the freelancer doesn't respond to your request, you can cancel
            the service, and the money will be refunded to your Worklink account
            immediately. It will appear in your balance page, and you can use it
            to hire other freelancers. If you encounter any issues with
            canceling the request or refunding your money, contact the help
            centre directly.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            5. Adhere to the Service Description.
          </h3>
          <p className="mb-4">
            Do not ask the freelancer for a service that differs from the one
            described on the service page.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            6. Communicate with the Freelancer Through Messages.
          </h3>
          <p className="mb-4">
            Do not use any external communication methods such as email, social
            media accounts, or any other means outside of the platform. Worklink
            will not be able to guarantee your rights if communication happens
            outside the platform to.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            7. Pay Only Through Worklink.
          </h3>
          <p className="mb-4">
            Do not send any payments outside of Worklink, as this will void your
            rights, and unfortunately, we will not be able to recover your money
            if you do.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            8. Stick to the Agreement Between You and the Freelancer.
          </h3>
          <p className="mb-6">
            You have the right to request any modifications as long as they are
            part of your agreement with the freelancer. If it is not possible to
            request additional services that are not mentioned in the service
            description or were not agreed upon.
          </p>

          <div className="border-t border-gray-300 mt-8 pt-6">
            <h3 className="text-lg font-semibold mb-2">
              Service Provider (Freelancer):
            </h3>

            <h3 className="text-lg font-semibold mb-2">
              1. Provide a Clear and Professional Service.
            </h3>
            <p className="mb-4">
              Make your service clear and specific in both the description and
              title. Add an image or link that accurately represents the
              service. The freelancer is responsible for any inconsistencies or
              discrepancies between the service information and what is
              delivered.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              2. Set an Adequately Delivery Time.
            </h3>
            <p className="mb-4">
              Set an appropriate deadline for delivering the service. If you are
              late, the client has the right to cancel the service after the
              delivery period has passed.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              3. Start Working on the Service When Receiving the Purchase Order.
            </h3>
            <p className="mb-4">
              Do not begin working on or delivering the service until the client
              has purchased it and paid in full. The order will appear in the
              "managing orders" section.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              4. Communicate with the Client via Worklink.
            </h3>
            <p className="mb-4">
              Do not request or add external communication methods. Worklink
              guarantees your rights as long as all communications are conducted
              through our platform.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              5. Offer Services in Compliance with the Terms of Use.
            </h3>
            <p className="mb-4">
              Do not offer services that violate the platform's terms of use do
              not agree to provide such services even through private messages,
              as these are constantly monitored by the administration.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              6. Freelancer Can Order a Service Without Prior Communication.
            </h3>
            <p className="mb-4">
              It is not necessary for the buyer to communicate with you before
              you hire the service. The buyer has the right to order services
              directly from the profile without prior contact. Make sure your
              service details are clear.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              7. The Freelancer Can Request Payment After Completing the
              Service.
            </h3>
            <p className="mb-4">
              You may request payment after completing the service fully and
              according to the agreed specifications. Requesting payment without
              delivering the service may result in immediate account suspension.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              8. Regarding the commission/service charges, a 5% commission is
              taken from the freelancer
            </h3>

            <p className="mt-8">
              Everything mentioned above largely pertains to the terms and
              conditions for services. Regarding projects, you can refer back.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Press here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPolicyPage;
