file(GLOB HEADERS "include/capricorn/app/*.hpp")
file(GLOB EGENESIS_HEADERS "../egenesis/include/capricorn/app/*.hpp")

add_library( capricorn_app 
             api.cpp
             application.cpp
             database_api.cpp
             impacted.cpp
             plugin.cpp
             ${HEADERS}
             ${EGENESIS_HEADERS}
           )

# need to link capricorn_debug_delegate because plugins aren't sufficiently isolated #246
target_link_libraries( capricorn_app capricorn_market_history capricorn_account_history capricorn_chain fc capricorn_db capricorn_net capricorn_time capricorn_utilities capricorn_debug_delegate )
target_include_directories( capricorn_app
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include"
                            "${CMAKE_CURRENT_SOURCE_DIR}/../egenesis/include" )

if(MSVC)
  set_source_files_properties( application.cpp api.cpp database_api.cpp PROPERTIES COMPILE_FLAGS "/bigobj" )
endif(MSVC)

INSTALL( TARGETS
   capricorn_app

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
INSTALL( FILES ${HEADERS} DESTINATION "include/capricorn/app" )
